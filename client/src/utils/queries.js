import gql from 'graphql-tag';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
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
`;

export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    username
    email
    _id
    orders {
      _id
      datePurchased
      products {
        productName
        productImage
        productDescription
        price
        _id
      }
    }
    shop {
      shopTitle
      shopLocation
      shopHero
      shopDescription
      profilePic
      _id
      products {
        _id
        productName
        productDescription
        productImage
      }
    }
  }
}
`;

export const QUERY_ME = gql`
    query me {  
    _id
    username
    email
    orders {
      _id
      datePurchased
      products {
        _id
        productName
        productDescription
        productImage
        price
      }
    }
    shop {
      _id
      shopTitle
      shopDescription
      shopHero
      shopLocation
      profilePic
      products {
        _id
        productName
        productDescription
        productImage
        price
      }
    }
  }
`

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;