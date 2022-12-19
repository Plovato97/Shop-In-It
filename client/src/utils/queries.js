import gql from 'graphql-tag';

export const QUERY_PRODUCTS = gql`
query Product($id: ID!) {
  product(_id: $id) {
    _id
    shopId
    productName
    productDescription
    productImage
    price
    category
  }
}
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      productName
      productDescription
      price
      category {
        categoryName
      }
    }
  }
`;

export const QUERY_ME = gql`
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

export const QUERY_SHOP = gql`
{
  me {
    shop {
      _id
      shopTitle
      shopDescription
      shopLocation
      shopHero
      profilePic
    }
  }
}
`;

export const QUERY_SHOP_PRODUCTS = gql`
{
  me {
    shop {
      products {
        productName
        productDescription
        price
        _id
      }
    }
  }
}
`;

export const QUERY_ORDERS = gql `
{
  me {
    orders {
      _id
      datePurchased
      products {
        _id
        productName
        productImage
        productDescription
        price
      }
    }
  }
}
`;
