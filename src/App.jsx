import { useState } from 'react'
import NavBarMobile from './components/Mobile/NavBarMobile'
import NavMobile from './components/Mobile/NavMobile'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'

function App() {

  return (
    <div className="App">
      <NavMobile></NavMobile>
      <NavBarMobile></NavBarMobile>


      <Hero></Hero>
      <FeaturedProducts></FeaturedProducts>

      <Footer></Footer>
    </div>
  )
}

export default App
