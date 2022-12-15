import React, { useState } from 'react';
import { Container, Card } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import Auth from '../../utils/auth';

function PostProducts () {

    const [formState, setFormState] = useState({ productTitle: '', productPrice: '', productDesc: ''});
    const [addProduct] = useMutation(ADD_PRODUCT);

    const handleProductSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addProduct({
            variables: {
                productTitle: formState.productTitle,
                productPrice: formState.productPrice,
                productDesc: formState.productDesc,
            },
        });
        const token = mutationResponse.data.addProduct.token;
        Auth.login(token);
    };

        const handleProductChange = (event) => {
            const { name, value } = event.target;
            setFormState({
                ...formState,
                [name]: value,
            });
        };

    return(
        <div>
            <form onSubmit={handleProductSubmit}>
                        <div className='flex-row space-between'>
                            <label htmlFor='productName'>Product Name:</label>
                            <input
                                placeholder='Name'
                                name='productName'
                                type='productName'
                                id='productName'
                                onChange={handleProductChange}
                            />
                        </div>
                        <div className='flex-row space-between'>
                            <label htmlFor='productPrice'>Product Price:</label>
                            <input
                                placeholder='Price'
                                name='productPrice'
                                type='productPrice'
                                id='productPrice'
                                onChange={handleProductChange}
                            />
                        </div>
                        <div className='flex-row space-between'>
                            <label htmlFor='productDesc'>Product Description:</label>
                            <input
                                placeholder='Description'
                                name='productDesc'
                                type='productDesc'
                                id='productDesc'
                                onChange={handleProductChange}
                            />
                        </div>
                        <div className='flex-row flex-end'>
                            <button type='product-submit'>Submit</button>
                        </div>
                   </form>
        </div>
    )
};

export default PostProducts;