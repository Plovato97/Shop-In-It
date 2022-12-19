import React from "react";
import NavBarMobile from '../components/Mobile/NavBarMobile'
import NavMobile from '../components/Mobile/NavMobile'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div className="container">
      <NavMobile></NavMobile>

      <Hero></Hero>

      <FeaturedProducts></FeaturedProducts>

      <Footer></Footer>

      <NavBarMobile></NavBarMobile> 
    </div>
  );
};

export default Home;
