import { useState } from 'react'
import NavBarMobile from './components/Mobile/NavBarMobile'
import NavMobile from './components/Mobile/NavMobile'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'

function App() {

  const [home, setHome] = useState(true)
  const [search, setSearch] = useState(false)
  const [car, setCar] = useState(false)
  const [user, setUser] = useState(false)

  return (
    <div className="App">
      <NavMobile></NavMobile>
      <NavBarMobile
        home={home}
        setHome={setHome}
        search={search}
        setSearch={setSearch}
        car={car}
        setCar={setCar}
        user={user}
        setUser={setUser}
      ></NavBarMobile>


      <Hero></Hero>
      <FeaturedProducts></FeaturedProducts>

      <Footer></Footer>
    </div>
  )
}

export default App
