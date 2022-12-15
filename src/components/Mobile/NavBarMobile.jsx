import { useState } from 'react'

const NavBarMobile = () => {

  const [home, setHome] = useState(true)
  const [search, setSearch] = useState(false)
  const [car, setCar] = useState(false)
  const [user, setUser] = useState(false)

  return (
    <section id='nav-bar'>
    <i 
      className={home ? 'fa-solid fa-house nav-bar_activate' : 'fa-solid fa-house'}
    ></i>

    <i className={search ? 'fa-solid fa-magnifying-glass nav-bar_activate' : 'fa-solid fa-magnifying-glass'}></i>

    <i className={car ? 'fa-solid fa-cart-shopping nav-bar_activate' : 'fa-solid fa-cart-shopping'}></i>

    <i className={user ? 'fa-solid fa-user nav-bar_activate' : 'fa-solid fa-user'}></i>
</section>
  )
}

export default NavBarMobile