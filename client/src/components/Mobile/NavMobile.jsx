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
      <NavShopCar></NavShopCar>
      </div>
    </nav>
  )
}

export default NavMobile