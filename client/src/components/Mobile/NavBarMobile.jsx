import React, { useState } from 'react'
import Signup from '../../pages/Signup';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const NavBarMobile = (
    home,
    setHome,
    search,
    setSearch,
    car,
    setCar,
    user,
    setUser
) => {

  const handleNavBar = (e) => {
    console.log(e.target.getAttribute)
  }


  return (
    <section id='nav-bar'>
    <i 
      className={home ? 'home fa-solid fa-house nav-bar_activate' : 'fa-solid fa-house'}
      data-home='home'
      onClick={handleNavBar}
    ></i>

    <i 
      className={search ? 'search fa-solid fa-magnifying-glass nav-bar_activate' : 'fa-solid fa-magnifying-glass'}
      onClick={handleNavBar}  
  ></i>

    <i 
      className={car ? 'car fa-solid fa-cart-shopping nav-bar_activate' : 'fa-solid fa-cart-shopping'}
      onClick={handleNavBar}
    ></i>
    
    {Auth.loggedIn() && (
    <i 
      className={user ? 'user fa-solid fa-user nav-bar_activate' : 'fa-solid fa-user'}
      onClick={handleNavBar}
      ></i>
    )}
</section>
  )
}

export default NavBarMobile