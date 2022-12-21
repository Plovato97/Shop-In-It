import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from '../utils/queries';

function Me() {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <p>Username: {data.me.username}</p>
      <p>Email: {data.me.email}</p>
      <p>Shop: {data.me.shop.shopTitle}</p>
      <p>Shop Description: {data.me.shop.shopDescription}</p>
      {data.me.shop.products.map(product => (
        <div key={product._id}>
          <p>Product Name: {product.productName}</p>
          <p>Product Description: {product.productDescription}</p>
          <img src={product.productImage} alt={product.productName} />
        </div>
      ))}
    </div>
  );
}

export default Me;