import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SHOP } from './queries';  // Import the addShop mutation

function App() {
  const [addShop, { data }] = useMutation(ADD_SHOP);  // Declare the addShop function using the useMutation hook

  const [shopTitle, setShopTitle] = useState('');  // Declare state variables to store the shop fields
  const [shopDescription, setShopDescription] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [shopHero, setShopHero] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addShop({  // Call the addShop function and pass the shop fields as arguments
        variables: {
          shopTitle,
          shopDescription,
          profilePic,
          shopLocation,
          shopHero,
        },
      });
      console.log(data);  // Log the returned data to the console
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render a form that allows the user to enter the shop fields */}
      <label htmlFor='shopTitle'>Shop Title:</label>
      <input
        type='text'
        value={shopTitle}
        onChange={(event) => setShopTitle(event.target.value)}
      />
      <label htmlFor='shopDescription'>Shop Description:</label>
      <input
        type='text'
        value={shopDescription}
        onChange={(event) => setShopDescription(event.target.value)}
      />
      <label htmlFor='profilePic'>Profile Picture:</label>
      <input
        type='text'
        value={profilePic}
        onChange={(event) => setProfilePic(event.target.value)}
      />
      <label htmlFor='shopLocation'>Shop Location:</label>
      <input
        type='text'
        value={shopLocation}
        onChange={(event) => setShopLocation(event.target.value)}
      />
      <label htmlFor='shopHero'>Shop Hero:</label>
      <input
        type='text'
        value={shopHero}
        onChange={(event) => setShopHero(event.target.value)}
      />
      <button type='submit'>Create Shop</button>
    </form>
  );
}  