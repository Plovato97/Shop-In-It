import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from './queries';  // Import the addOrder mutation

function App() {
    const [addOrder, { data }] = useMutation(ADD_ORDER);  // Declare the addOrder function using the useMutation hook

    const [product, setProduct] = useState({
        _id: '',
        shopId: '',
        productName: '',
        productDescription: '',
        productImage: '',
        price: 0,
        category: []
    });  // Declare a state variable to store the product input fields

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addOrder({  // Call the addOrder function and pass the product object as an argument
                variables: {
                    product,
                },
            });
            console.log(data);  // Log the returned data to the console
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            {/* Render a form to capture the product input fields */}
            <input
                type='text'
                value={product._id}
                onChange={(event) => setProduct({ ...product, _id: event.target.value })}
                placeholder='Product ID'
            />
            <input
                type='text'
                value={product.shopId}
                onChange={(event) => setProduct({ ...product, shopId: event.target.value })}
                placeholder='Shop ID'
            />
            <input
                type='text'
                value={product.productName}
                onChange={(event) => setProduct({ ...product, productName: event.target.value })}
                placeholder='Product Name'
            />
            <input
                type='text'
                value={product.productDescription}
                onChange={(event) => setProduct({ ...product, productDescription: event.target.value })}
                placeholder='Product Description'
            />
            <input
                type='text'
                value={product.productImage}
                onChange={(event) => setProduct({ ...product, productImage: event.target.value })}
                placeholder='Product Image URL'
            />
            <input
                type='number'
                value={product.price}
                onChange={(event) => setProduct({ ...product, price: event.target.value })}
                placeholder='Price'
            />
            <input
                type='text'
                value={product.category}
                onChange={(event) => setProduct({ ...product, category: event.target.value })}
                placeholder='Category'
            />
            <button type='submit'>Add Product to Order</button>
        </form>
    );
}

