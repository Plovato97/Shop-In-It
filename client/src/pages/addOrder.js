import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from './queries';  // Import the addOrder mutation

function App() {
  const [addOrder, { data }] = useMutation(ADD_ORDER);  // Declare the addOrder function using the useMutation hook

  const [productId, setProductId] = useState('');  // Declare a state variable to store the product ID

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addOrder({  // Call the addOrder function and pass the product ID as an argument
        variables: {
          product: productId,
        },
      });
      console.log(data);  // Log the returned data to the console
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render a form that allows the user to enter a product ID */}
      <input
        type='text'
        value={productId}
        onChange={(event) => setProductId(event.target.value)}
      />
      <button type='submit'>Add Product to Order</button>
    </form>
  );
}