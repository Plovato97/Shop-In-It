import React from 'react'
import NavMobile from '../components/Mobile/NavMobile';
import NavBarMobile from '../components/Mobile/NavBarMobile';
import UserHero from '../components/userElements/UserHero';
import UserProducts from '../components/userElements/UserProducts';

const UserPage = () => {
  return (
    <section id='userPage'>
        <NavMobile></NavMobile>

        <UserHero></UserHero>

        <UserProducts></UserProducts>

        <NavBarMobile></NavBarMobile>

    </section>
  )
}

export default UserPage