import React from 'react'
import ItemCart from './ItemCart'

const LeftCart = () => {
  return (
    <section id='left-cart'>
        <div className='cart-go-back_div'>
            <a>{"<"}</a>
            <p>Shopping Continue</p>
        </div>

        <hr/>

        <div className='cart-items_div'>
            <div className='cart-items_title'>
                <h2>Shoping Cart</h2>
                <p>Checkout your items</p>
            </div>

            <div className='item-cart-container'>
                <ItemCart></ItemCart>
                <ItemCart></ItemCart>
                <ItemCart></ItemCart>
                <ItemCart></ItemCart>
                <ItemCart></ItemCart>
            </div>
        </div>
    </section>
  )
}

export default LeftCart