import React from "react";
// import PostProducts from './components/PostProducts';
import { Products } from '../pages/Products';
import { Product } from '../components/Product';
import Hero from '../components/Hero'
import HeroTop from '../components/HeroTop';
import Categories from '../components/Categories';
import NavBarMobile from '../components/Mobile/NavBarMobile';

const Home = () => {
  return (
    <div className="container">
      <div>
      <HeroTop />
        <Categories />
        <Hero />
        <div className='products'> {Products.map((product) => (<Product data={product} /> ))}</div>
      </div>
      <NavBarMobile></NavBarMobile>
    </div>
  );
};

export default Home;
