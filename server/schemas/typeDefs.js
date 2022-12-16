const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Category {
        _id: ID
        categoryName: String
    }
    type Checkout {
        session: ID
    }
    input ProductInput {
        productId: ID!
        productName: String!
        productDescription: String
        productImage: String
        price: Float
        category: Category
    }
    type Product {
        productId: ID!
        productName: String!
        productDescription: String
        productImage: String
        price: Float
        category: Category
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
        orders: [Order]
        shop: Shop
    }
    type Shop {
        _id: ID!
        shopTitle: String!
        shopDescription: String!
        shopHero: String
        shopLocation: String
        profilePic: String
        products: [Product]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        categories: [Category]
        products(category: ID, name: String): [Product]
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
        addProduct(input: ProductInput!): Shop
        removeProduct(productId: ID!): Shop
        updateShop(shopId: ID! shopTitle: String, shopDescription: String, profilePic: String, shopLocation: String, shopHero: String): Shop   
    } 
`;

module.exports = typeDefs;