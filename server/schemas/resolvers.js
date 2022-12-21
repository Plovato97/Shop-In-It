const { AuthenticationError } = require("apollo-server-express");

const { User, Shop, Product, Order } = require("../models");
const { signToken } = require("../utils/auth");

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
        categories: async () => {
            return await Category.find();
        },
        products: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }
            return await Product.find(params)
                .populate('category');
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id)
                .populate('category');
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
                        path: 'orders.products'
                    });

                return user.orders(_id);
            }
            throw new AuthenticationError('Not logged in');
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

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addOrder: async (parent, { product }, context) => {
            if (context.user) {
              const order = new Order({ products: [product] });
              
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