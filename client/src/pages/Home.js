import React from "react";
// import PostProducts from './components/PostProducts';
import { Products } from '../pages/Products';
import { Product } from '../components/Product';
import NavBarMobile from '../components/Mobile/NavBarMobile'
import NavMobile from '../components/Mobile/NavMobile'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div className="container">
      {/* <div>
        <div className='products'> {Products.map((product) => (<Product data={product} /> ))}</div>
      </div> */}
    </div>
  );
};

export default Home;
