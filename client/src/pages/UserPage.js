import React from 'react'
import Nav from '../components/Nav';
import NavBarMobile from '../components/Mobile/NavBarMobile';
import UserHero from '../components/userElements/UserHero';
import UserProducts from '../components/userElements/UserProducts';
import Footer from '../components/Footer';

const UserPage = () => {
  return (
    <section id='userPage'>
        <Nav></Nav>

        <UserHero></UserHero>

        <UserProducts></UserProducts>

        <NavBarMobile></NavBarMobile>

        <Footer></Footer>

    </section>
  )
}

export default UserPage