const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
    }
    type Shop {
        _id: ID!
        shopTitle: String!
        shopDescription: String!
        shopHero: String
        shopLocation: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        shop(username: String!): Shop
        users: [User]
        user(username: String!): User 
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addShop(shopTitle: String!, shopDescription: String!, profilePic: String, shopLocation: String, shopHero: String): Shop
    }

`;

module.exports = typeDefs;