const { AuthenticationError } = require("apollo-server-express");
const { User, Shop, Product, Order, Category } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require('stripe')('pk_test_51MGuE7LGOiqGma5eMYYafp3n4sNMuS7c9cbgcjnat8njwXtExXIpRDqtSSGVlDfBVib3CVow3ACZJQzAmptxHnQV00tK5IUeoJ')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                // Find the user and select only the desired fields
                const user = await User.findOne({ _id: context.user._id })
                    .select('-__V -password')
                    .populate({path: 'orders.products', populate: 'products'})

                // Populate the shop field and select only the desired fields
                const shop = await Shop.findOne({ _id: user.shop })
                    .select('-__V')
                    .populate('products', '-__V');

                                    // Populate the shop field and select only the desired fields
                const order = await Order.findOne({ _id: user.order })
                .select('-__V')
                .populate('products', '-__V');


                // Add the shop and products fields to the user object
                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
                user.shop = shop;
                user.products = shop.products;

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
        // Get all users from query
        users: async (parent, args, context, info) => {
            // Query all users
            const users = await User.find({});

            // Return array of users
            return users;
        },
        // Get all shops from query
        shops: async (parent, args, context, info) => {
            // Query all shops
            const shops = await Shop.find({});

            // Return array of shops
            return shops;
        },
        // Get a single user from username query
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__V -password')
        },
        product: async (parent, { _id }) => {
            return Product.findById(_id)
        },
        products: async (parent, args, context, info) => {
            const query = {};
            if (args.category) {
              query.category = args.category;
            }
            if (args.name) {
              query.name = { $regex: new RegExp(args.name, 'i') };
            }
            const products = await Product.find(query);
            return products;
          },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)
                    .populate({
                        path: 'orders.products',
                        populate: 'category'
                    });

                return user.orders(_id);
            }
            throw new AuthenticationError('Not logged in');
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];
      
            const { products } = await order.populate('products');
      
            for (let i = 0; i < products.length; i++) {
              const product = await stripe.products.create({
                name: products[i].productName,
                description: products[i].productDescription,
                images: [`${url}/images/${products[i].productImage}`]
              });
      
              const price = await stripe.prices.create({
                product: product._id,
                unit_amount: products[i].price * 100,
                currency: 'usd',
              });
      
              line_items.push({
                price: price._id,
                quantity: 1
              });
            }
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
      
            return { session: session.id };
          }

    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Incorrect login credentials!");
            };

            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) {
                throw new AuthenticationError("Incorrect login credentials!");
            };

            const token = signToken(user);
            return { token, user };
        },

        createCustomer: (parent, { input }) => {
            return stripe.customers.create(input);
          },
        
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
              const order = new Order({ products });

              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
              return order;
            }
            throw new AuthenticationError('Not logged in');
          },
        addShop: async (parent, args, context) => {
            // Retrieve the current logged-in user from the context
            const user = await User.findOne({ _id: context.user._id });

            // Create the shop
            const shop = await Shop.create(args);

            // Set the `shop` field of the user to the newly created shop
            user.shop = shop;

            // Save the user
            await user.save();

            return shop;
        },
        addProduct: async (parent, args, context) => {
            // Ensure that the user is logged in
            if (!context.user) {
                throw new Error("You must be logged in to add a product to the shop");
            }


            const shop = await Shop.findOne({ _id: args.shopId });


            // Create the product and add it to the shop
            const product = await Product.create(args);
            shop.products.push(product);
            await shop.save();

            return product;
        },

        deleteProduct: async (parent, args, context) => {
            // Ensure that the user is logged in
            if (!context.user) {
                throw new Error("You must be logged in to delete a product from the shop");
            }

            const shop = await Shop.findOne({ _id: args.shopId });

            // Find the product and delete it
            const product = await Product.findOne({ _id: args.productId });
            if (!product) {
                throw new Error("Product not found");
            }
            await product.delete();

            // Remove the product from the shop's products array
            shop.products = shop.products.filter(p => p._id !== product._id);

            // Save the updated shop
            await shop.save();

            return product;
        },
          addOrder: async (parent, { products }, context) => {
            try {
              if (context.user) {
                console.log(`Adding order with products: ${products}`);
          
                const order = new Order({ products });
          
                console.log(`Saving order: ${order}`);
          
                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
          
                console.log(`Successfully added order to user's orders array`);
          
                return order;
              }
              throw new AuthenticationError('Not logged in');
            } catch (err) {
              console.error(err);
              throw new Error(err);
            }
          },

        deleteOrder: async (parent, args, context) => {
            try {
              // Ensure that the user is logged in and has an ID
              if (!context.user || !context.user._id) {
                throw new Error("You must be logged in to delete an order");
              }
          
              // Retrieve the user from the database
              const user = await User.findById(context.user._id);
          
              // Find the order and remove it from the user's orders array
              const order = user.orders.find(order => order.id === args.orderId);
              if (!order) {
                throw new Error("Order not found");
              }
              user.orders = user.orders.filter(o => o.id !== args.orderId);
          
              // Save the modified user to the database
              await user.save();
          
              // Return the deleted order
              return order;
            } catch (err) {
                console.error(err);
              throw new Error(err);
            }
        },
        updateShop: async (parent, args, context) => {
            try {
                // Get the shop ID from the arguments
                const { shopId } = args;

                // Get the authenticated user's ID from the context
                const userId = context.user._id;

                // Check if the authenticated user is the owner of the shop
                const shop = await Shop.findOne({ _id: shopId, owner: userId });
                if (!shop) {
                    throw new Error('You are not the owner of this shop.');
                }

                // Update the shop with the provided information
                const updatedShop = await Shop.findOneAndUpdate(
                    { _id: shopId },
                    { $set: { ...args } },
                    { new: true }
                );

                // Return the updated shop
                return updatedShop;
            } catch (error) {
                throw error;
            }
        }

    }
}

module.exports = resolvers;