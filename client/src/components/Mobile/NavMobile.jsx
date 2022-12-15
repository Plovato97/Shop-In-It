import React from "react";
import NavShopCar from "../Elements/NavShopCar"
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const NavMobile = () => {
  
  return (
    <nav id='nav-mobile'>
      <p className='logo'>Logo</p>

      <NavShopCar></NavShopCar>
      {/* <Routes>
        <Route path='/Signup' element={<Signup />}>Sign Up</Route>
      </Routes> */}
      {/* <Login />
      <Signup /> */}
    </nav>
  )
}

export default NavMobile