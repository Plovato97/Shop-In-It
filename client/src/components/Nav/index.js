import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className='flex-row'>
                    {/* <li className='mx-1'>
                        <Link to='/postProduct'>Post Products</Link>
                    </li> */}
                    <li className='mx-1'>
                        <Link to='/orderHistory'>Order History</Link>
                    </li>
                    <li className='mx-1'>
                        <a href='/' onClick={() => Auth.logout()}>Logout</a>
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
                        <Link to='/login'>Log In</Link>
                    </li>
                    {/* <li className='mx-1'>
                        <Link to='/PostProducts'>Post Products</Link>
                    </li> */}
                </ul>
            );
        }
    }

    return (
        <header className='flex-row px-1'>
            <h1>
                <Link to='/'>
                    <span>Logo Goes Here</span>
                </Link>
            </h1>

            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}

export default Nav;