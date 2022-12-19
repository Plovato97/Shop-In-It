const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Category {
        _id: ID
        categoryName: String
    }
    type Checkout {
        session: ID
    }
    type Product {
        _id: ID!
        shopId: String
        productName: String
        productDescription: String
        productImage: String
        price: Float
        category: [String]
    }
    input ProductInput {
        _id: ID!
        shopId: String
        productName: String
        productDescription: String
         productImage: String
        price: Float
        category: [String]
    }
    type Order {
        _id: ID
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
        product(_id: ID!): Product
        products(category: String, name: String): [Product]
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
        addProduct(shopId: ID! productName: String!, productDescription: String!, productImage: String, price: Float!, category: [String]): Product
        deleteProduct(shopId: ID! productId: ID!): Product
        addOrder(product: ProductInput!): Order
        deleteOrder(orderId: ID!): Order
        updateShop(shopId: ID! shopTitle: String, shopDescription: String, profilePic: String, shopLocation: String, shopHero: String): Shop    
        
    }
`;

module.exports = typeDefs;