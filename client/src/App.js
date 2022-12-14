import NavBarMobile from './components/Mobile/NavBarMobile'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup/Signup';
import Cart from './pages/CartPage/Cart';
import UserPage from './pages/UserPage';
import Nav from './components/Nav';
// import ProductPage from './components/ProductPost';
import { Products } from './pages/Products';
import { Product } from './components/Product';
import PostProducts from './components/PostProducts';
import Categories from './components/Categories';
import HeroTop from './components/HeroTop';
import AddShop from './pages/createShop';
import Shop from './pages/Shop';


// import LoadAllProducts from './pages/loadAllProducts';

// import 'react-tippy/dist/tippy.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shopId, setShopId] = useState('');

  useEffect(() => {
    const storedIsAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    const storedShopId = localStorage.getItem('shopId');
    if (storedIsAuthenticated) {
      setIsAuthenticated(storedIsAuthenticated);
    }
    if (storedShopId) {
      setShopId(storedShopId);
    }
  }, []);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav isAuthenticated={isAuthenticated} shopId={shopId} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/user' element={<UserPage />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/create-shop' element={<AddShop />}></Route>
          <Route path="/shop/:id" element={<Shop/>}></Route>
          {/* <Route path='/postProduct' element={<ProductPage />} /> */}
        </Routes>
        {/* <div className="container">
          <LoadAllProducts />
        </div>
        <NavBarMobile></NavBarMobile> */}
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;