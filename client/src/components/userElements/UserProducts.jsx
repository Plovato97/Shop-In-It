import React from 'react'
import ProductCard from '../Elements/ProductCard'
// import {Tooltip} from 'react-tippy'

const UserProducts = () => {
  return (
    <section id='user-products'>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

        <div className='settings'>
        {/* <Tooltip  */}
            title="Welcome to React"
            position="top"
            trigger="click"
            size='big'
            arrow='true'
            theme='light'
            interactive
            html={
                <div>
                    <a href="">Add Product</a> <br />
                    <a href="">Sing Out</a>
                </div>
            }
        >
            <i class="fa-solid fa-gear"></i>
        {/* </Tooltip> */}
        </div>

    </section>
  )
}

export default UserProducts