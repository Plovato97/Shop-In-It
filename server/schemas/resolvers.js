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
        users: async (parent, args, context, info) => {
            // Query all users
            const users = await User.find({});

            // Return array of users
            return users;
        },
        shops: async (parent, args, context, info) => {
            // Query all shops
            const shops = await Shop.find({});

            // Return array of shops
            return shops;
        },
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
        order: async (parent, {_id}, context) => {
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
        addOrder: async (parent, {products}, context) => {
            if (context.user) {
                const order = new Order({products});

                await User.findByIdAndUpdate(context.user._id, {$push: {orders: order}});

                return order;
            }
            throw new AuthenticationError('Not logged in');
        }
    }
}

module.exports = resolvers;