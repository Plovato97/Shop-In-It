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
        product: async (parent, { _id }) => {
            return Product.findById(_id)
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
          }
          
    }
}

module.exports = resolvers;