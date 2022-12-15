const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Checkout {
        session: ID
    }
    type Product {
        _id: ID!
        productName: String
        productDescription: String
        productImage: String
        price: Float
    }
    type Order {
        _id: ID!
        datePurchased: String
        products: [Product]
    }
    type User {
        _id: ID!
        username: String!
        email: String
        order: [Order]
        shop: Shop
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
        product(_id: ID!): Product
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
        shops: [Shop]
        shop(username: String!): Shop
        users: [User]
        user(username: String!): User 
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addShop(shopTitle: String!, shopDescription: String!, profilePic: String, shopLocation: String, shopHero: String): Shop
        addOrder(products: [ID]!): Order
    }

`;

module.exports = typeDefs;