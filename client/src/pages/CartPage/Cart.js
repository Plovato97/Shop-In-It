import React from 'react'
import LeftCart from './LeftCart'
import RightCart from './RightCart'
import './cart.css'

const Cart = () => {
  return (
    <section id='cart'>
      <LeftCart></LeftCart>
      <RightCart></RightCart>
    </section>
  )
}

export default Cart