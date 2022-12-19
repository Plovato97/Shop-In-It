import NavBarMobile from './components/Mobile/NavBarMobile'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'
import React, {useState} from 'react';
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
// import { StoreProvider } from './utils/GlobalState';
import Nav from './components/Nav';
// import ProductPage from './components/ProductPost';
import { Products } from './pages/Products';
import { Product } from './components/Product';
import PostProducts from './components/PostProducts';
import Categories from './components/Categories';

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
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/login' element={<Login />} /> 
            <Route path='/signup' element={<Signup />} /> 
            {/* <Route path='/postProduct' element={<ProductPage />} /> */}
          </Routes>
        <div>
          <Categories />
          <Hero />
          <div className='products'> {Products.map((product) => (<Product data={product} /> ))}</div>
        </div>
        <NavBarMobile></NavBarMobile>
      </Router>
    </ApolloProvider>
  );
}

export default App;