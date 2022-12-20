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

export const QUERY_USER = gql`
{
  me {
    _id
    email
    username
  }
}
`;

export const QUERY_ME = gql`
{
  me {
    _id
    email
    username
    orders {
      _id
      datePurchased
      products {
        _id
        productName
        productImage
        productDescription
        price
        shopId
      }
    }
    shop {
      _id
      shopTitle
      shopLocation
      shopHero
      shopDescription
      products {
        productName
        productImage
        productDescription
        price
        _id
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
    _id
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
