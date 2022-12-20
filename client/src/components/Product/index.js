import React from 'react';
import './product.css';

export const Product = (props) => {
    const { id, productName, price, productImage } = props.data;
    return (
        <article>
        <div className='container-product'>
            <div className='product'>
                <img src={productImage} />
                <div className='description'>
                    <p>{productName}</p>
                    <p>${price}</p>
                </div>
                <button className='addToCartBttn'>Add to Cart</button>
            </div>
        </div>
        </article>
    )
};
