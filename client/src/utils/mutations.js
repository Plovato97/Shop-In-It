import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

// export const UPDATESHOP = updateShop($shopId: ID!, $shopDescription: String, $shopTitle: String) {
//     updateShop(shopId: $shopId, shopDescription: $shopDescription, shopTitle: $shopTitle) {
//       _id
//       shopDescription
//       shopHero
//       shopLocation
//       shopTitle
//     }

export const ADD_SHOP = gql`
mutation AddShop(
    $shopTitle: String!, 
    $shopDescription: String!, 
    $profilePic: String, 
    $shopLocation: String, 
    $shopHero: String) {
  addShop(shopTitle: $shopTitle, shopDescription: $shopDescription, profilePic: $profilePic, shopLocation: $shopLocation, shopHero: $shopHero) {
    _id
    shopDescription
    shopHero
    shopLocation
    shopTitle
  }
}
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
    mutation addProduct($products: [ID]!) {
        addProduct(products: $products) {
            products {
                _id
                name
                description
                price
                category {
                    name
                }
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser(
        $username: String!
        $email: String!
        $password: String!
    ) {
        addUser(
            username: $username
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`;