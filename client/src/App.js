// import logo from './logo.svg';
// import './App.css';
import NavBarMobile from './components/Mobile/NavBarMobile'
import NavMobile from './components/Mobile/NavMobile'
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
import Signup from './pages/Signup';
import UserPage from './pages/UserPage';
import { StoreProvider } from './utils/GlobalState';
import Nav from './components/Nav';
import ProductPage from './components/ProductPost';
import { Products } from './pages/Products';
import { Product } from './components/Product';
import 'react-tippy/dist/tippy.css';

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
        {/* <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route path='/' element={<Home />} /> 
              <Route path='/login' element={<Login />} /> 
              <Route path='/signup' element={<Signup />} /> 
              <Route path='/postProduct' element={<ProductPage />} />
            </Routes>
            <div>
              <div className='products'> {Products.map((product) => (<Product data={product} /> ))}
                </div>
            </div>
          </StoreProvider>
        </div> */}

            <Routes>
              <Route path='/' element={<Home />} /> 
              <Route path='/login' element={<Login />} /> 
              <Route path='/signup' element={<Signup />} /> 
              <Route path='/postProduct' element={<ProductPage />} />
              <Route path='/user' element={<UserPage />} /> 
            </Routes>

        {/* <NavMobile></NavMobile>

        <Hero></Hero>
        
        <FeaturedProducts></FeaturedProducts>

        <Footer></Footer>

        <NavBarMobile></NavBarMobile> */}
      </Router>
    </ApolloProvider>
  );
}

export default App;
