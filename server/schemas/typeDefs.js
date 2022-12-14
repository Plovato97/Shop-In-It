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
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;