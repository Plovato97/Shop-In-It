import React from 'react';
import NavShopCar from "../Elements/NavShopCar"
import { Link } from 'react-router-dom';

function Nav() {

     // Navbar scroll - Javascript
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
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
            <NavShopCar></NavShopCar>
        </nav>

        </header>
    );
}

export default Nav;