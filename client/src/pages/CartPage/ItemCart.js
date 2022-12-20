import React from 'react'

const ItemCart = () => {
  return (
    <div className='item-card_div'>
        <div className='item-card_left'>
            <img src='https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/0d2eef8f-dc1d-4d9f-a14d-8604cc80d3d0/sportswear-premium-essentials-mens-t-shirt-mkhTvc.png' alt='item imagen'/>

            <p className='product-name'>T-shirt</p>
        </div>

        <div className='item-card_right'>
            <p>$20</p>
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>
  )
}

export default ItemCart