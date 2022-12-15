const { AuthenticationError } = require("apollo-server-express");
const { User, Shop, Product, Order } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__V -password')
                    .populate('shop')
                    .populate({
                        path: 'orders.products',
                        populate: 'category'
                    });
                
                userData.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return userData;
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
        products: async (parent, {category, name }) => {
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
        product: async (parent, {_id}) => {
            return await Product.findById(_id)
                .populate('category');
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)
                    .populate({
                        path: 'orders.products'
                    });

                return user.orders.id(_id);
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
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
                const order = new Order({ products });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }
            throw new AuthenticationError('Not logged in');
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
          },
          removeProduct: async (parent, args, context) => {
            try {
                // Get the authenticated users's ID and the productID
                const userId = context.user._id;
                const {productId} = args;

                // check if the authenticated user is the owner of the product
                const product = await Product.findOne({
                    _id: productId, owner: userId
                });

                if (!product) {
                    throw new AuthenticationError('You are not the owner of this product');
                }

                // remove the product from the shop
                const updatedShop = await Shop.findOneAndUpdate(
                    {_id: product.shopId},
                    {$pull: {products: productId}},
                    {new: true}
                );

                // return the updated shop
                return updatedShop;
            } catch (error) {
                throw error;
            }
        },
          
    }
}

module.exports = resolvers;