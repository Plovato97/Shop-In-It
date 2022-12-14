import React, { useState } from 'react'
import { NavShopCell } from "./NavShopCell"
import { Link, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import './NavShop.css';

const NavShopCar = () => {

    const [shopCarList, setShopCarList] = useState(false)

    const hanldeCarList = () => {
        if(!shopCarList) {
            setShopCarList(true)
        } else {
            setShopCarList(false)
        }
    }

    const location = useLocation();
    const shopId = location.pathname.split('/');

    function showNavigation() {
      if (Auth.loggedIn()) {

          return (
               <ul className='flex-row-b'>
                  <li className='mx-2'>
                    <a href='/' onClick={() => Auth.logout()}>Logout</a>
                  </li>
                  <li className='mx-2'>
                    <Link to="/create-shop">Create Shop </Link>
                  </li>
                  <li className='mx-2'>
                  <Link to={`/shop/${shopId}`}>
                         My Shop
                    </Link>
                  </li>
                  <li className='mx-2'>
                      <Link to='/orderHistory'>Order History</Link>
                  </li>
                  <li className='mx-2'>
                    <Link to='/user'>
                    <i class="fa-solid fa-user"></i>
                    </Link>
                  </li>
                  

               </ul>
          );
      } else {
          return (
               <ul className='flex-row'>
                  <li className='mx-1'>
                      <Link to='/signup'>Sign Up</Link>
                  </li>
                  <li className='mx-1'>
                      <Link to='/login'>Log In </Link>
                  </li>
                  {/* <li className='mx-1'>
                      <Link to='/PostProducts'>Post Products</Link>
                  </li> */}
               </ul>
          );
      }
  }

  return (
    <div>
      <div className='nav-shopCar_container'>
        <div className='nav-shopCar-icon'>
          <Link to='/cart'>
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <span className='nav-shopCar-count'>1</span>
        </div>

        <div className='nav-shopCar-info'>
          <p className='shopCar-p'>My cart</p>
          <p className='shopCar-amount shopCar-amount_green'>$21</p>
          <i 
            className="fa-solid fa-angle-down"
            onClick={hanldeCarList}
          ></i>

            {shopCarList && <NavShopCell></NavShopCell>}
        </div>
      </div>
      
      <nav>
        {showNavigation()}
      </nav>
    </div>


  )
}

export default NavShopCar