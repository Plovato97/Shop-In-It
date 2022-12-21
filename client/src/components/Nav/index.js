import React from 'react';
import NavShopCar from "../Elements/NavShopCar"
import { Link, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';

function Nav() {
    const location = useLocation();
    const shopId = location.pathname.split('/');
    // Navbar scroll - Javascript
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("nav-mobile").style.top = "0";
        } else {
            document.getElementById("nav-mobile").style.top = "-150px";
        }
        prevScrollpos = currentScrollPos;
    }

    return (
        <header className='flex-row px-1'>
            <nav id='nav-mobile'>
                <Link to='/'>
                    <p className='logo'>Shop 'n It</p>
                </Link>
                
                { Auth.loggedIn() && !shopId && (
                    <Link to="/create-shop">
                       Create Shop 
                    </Link>
                )}
                { Auth.loggedIn() && shopId && (
                    <Link to={`/shop/${shopId}`}>
                         My Shop
                    </Link>
                )}
            

                <NavShopCar></NavShopCar>
                
            </nav>

        </header>
    );
}

export default Nav;