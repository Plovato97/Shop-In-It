import productImg from '../../assets/img/product.jpg'

export const NavShopCell = () => {
  return (
  <div className='nav-shopCar_shop-list'>
    <div className='shop-list-cell'>
      <img src={productImg} alt="" />
    <div>
        <p className='product-name'>Oculus</p>
        <p className='price'>$ 499.49</p>
      </div>
    </div>

    <div className='shop-list-cell'>
      <img src={productImg} alt="" />
    <div>
        <p className='product-name'>Oculus</p>
        <p className='price'>$ 499.49</p>
      </div>
    </div>

    <div className='shop-list-cell'>
      <img src={productImg} alt="" />
    <div>
        <p className='product-name'>Oculus</p>
        <p className='price'>$ 499.49</p>
      </div>
    </div>

    
  </div>
  )
}
