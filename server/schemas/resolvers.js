const { AuthenticationError } = require("apollo-server-express");
const { User, Shop } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__V -password')

            return userData;
        }

        throw new AuthenticationError('Not logged in');
    },
    
    user: async (parent, { username }) => {
        return User.findOne({ username })
            .select('-__V -password')

    },
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
        }
    }
}

module.exports = resolvers;