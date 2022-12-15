import { useState } from 'react'
import { NavShopCell } from "./NavShopCell"

const NavShopCar = () => {

    const [shopCarList, setShopCarList] = useState(false)

    const hanldeCarList = () => {
        if(!shopCarList) {
            setShopCarList(true)
        } else {
            setShopCarList(false)
        }
    }

  return (
    <div className='nav-shopCar_container'>
    <div className='nav-shopCar-icon'>
      <i class="fa-solid fa-cart-shopping"></i>
      <span className='nav-shopCar-count'>1</span>
    </div>

    <div className='nav-shopCar-info'>
      <p className='shopCar-p'>My cart</p>
      <p className='shopCar-amount shopCar-amount_green'>$21</p>
      <i 
        class="fa-solid fa-angle-down"
        onClick={hanldeCarList}
      ></i>

        {shopCarList && <NavShopCell></NavShopCell>}
    </div>
  </div>
  )
}

export default NavShopCar