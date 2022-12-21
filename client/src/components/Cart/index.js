import React, { useContext } from 'react';
import { Products } from '../../pages/Products';
import { CartItem } from './cart-item';
import { ShopContext } from '../../context/shop-context';
import './cart.css';

function Cart () {
    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    return (
        <div className='cart'>
            <div>
                <h1>Your Cart Items</h1>
            </div>
            <div className='cartItems'>
                {Products.map((product) => {
            if (cartItems[product.id] !== 0) {
                return <CartItem data={product} />;
          }
        })}
            </div>
            {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={''}> Continue Shopping </button>
          <button
            // onClick={() => {
            //   checkout();
            //   navigate("/checkout");
            // }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};

export default Cart