import React from 'react'
// import '../../userPage/index.css'

const UserHero = () => {
  return (
    <section id='user-hero'>
        <img className='user-img-cover' src="https://images.pexels.com/photos/3664342/pexels-photo-3664342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div className='user-photo'>
            <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="user photo" />
        </div>
    </section>
  )
}

export default UserHero