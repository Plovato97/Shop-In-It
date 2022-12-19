import NavShopCar from "../Elements/NavShopCar"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const NavMobile = () => {
  return (
    <nav id='nav-mobile'>
      <Link to="/">
        <p className='logo'>Logo</p>
      </Link>
      
      

      <div className="nav-links">
      <i className="fa-solid fa-magnifying-glass"></i>
      <Link to="/user" >
      <i className="fa-solid fa-user"></i>
      </Link>
      <NavShopCar></NavShopCar>
      </div>
    </nav>
  )
}

export default NavMobile