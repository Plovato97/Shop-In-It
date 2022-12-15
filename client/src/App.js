// import logo from './logo.svg';
// import './App.css';
import React from 'react';
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
import { StoreProvider } from './utils/GlobalState';
import Nav from './components/Nav';
import ProductPage from './components/ProductPost';
import { Products } from './pages/Products';
import { Product } from './components/Product';

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
        <div>
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
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
