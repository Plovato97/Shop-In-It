import NavShopCar from "../Elements/NavShopCar"
import { Link } from 'react-router-dom';

const NavMobile = () => {

  return (
    <div>
        <nav id='nav-mobile'>
        <Link to='/'>
            <p className='logo'>Shop 'n It</p>
        </Link>
            <NavShopCar></NavShopCar>
        </nav>
    </div>
  )
}

export default NavMobile