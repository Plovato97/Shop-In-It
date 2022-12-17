import React from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import iphone from '../../assets/iphone.jpg';

const ProductDetails = () => {

    // This will need to be replaced with actual code to replace the page. This is just a holder
    const projects = [
        {
            title: 'iPhone 14',
            img: 'iphone',
            details: '',
            price: ''
        }
    ]


  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    {/* <img src={urlFor(image && image[0])}></img> */}
                    <img src={iphone} />
                </div>
                {/* <div className='small-images-container'>
                    {image?.map((item, i) => (
                    <img src={urlFor(item)}
                    className=''
                    onMouseEnter=''
                    />
                    ))}
                </div> */}
            </div>
            <div className='product-details-desc'>
                {/* <h1>{title}</h1> */}
                <h1>iPhone 14 Max Pro</h1>
                <div className='reviews'></div>
                <div>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                </div>
                <p>(20)</p>
            </div>
            <h4>Details:</h4>
            {/* <p>{details}</p> */}
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla quod quos culpa tempora eligendi. Similique praesentium modi alias adipisci hic quos rerum incidunt non earum, porro quam sequi reiciendis debitis sed, laborum nulla laboriosam, commodi asperiores totam eum rem soluta obcaecati atque. Voluptatum, doloribus recusandae architecto, perferendis magnam aliquam provident totam, dolores dolore ipsam sequi? Repudiandae reiciendis odio, numquam dicta, corporis hic aut necessitatibus eaque, in accusantium eveniet magnam voluptatibus rem inventore velit atque aliquid itaque consectetur tempora dignissimos aliquam iste. Eius dolores accusamus, voluptatum provident nesciunt aspernatur corporis hic ipsam impedit quas vitae nemo quia non totam, adipisci tempore?</p>
            {/* <p className='price'>${price}</p> */}
            <p className='price'>$999.99</p>
            <div className='quantity'>
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                    <span className='minus'
                    onClick=''><AiOutlineMinus /></span>
                    <span className='num'
                    onClick=''>0</span>
                    <span className='plus'
                    onClick=''><AiOutlinePlus /></span>
                </p>
            </div>
            <div className='buttons'>
                <button type='button' 
                className='add-to-cart'
                onClick=''>Add to Cart
                </button>
                <button type='button' 
                className='buy-now'
                onClick=''>Buy Now
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails;