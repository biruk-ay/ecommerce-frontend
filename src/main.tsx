import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './apps/store/store';
import ProductManagement from './components/ProductManagement';
import Home from './components/Home';
import ProductList from './components/ProductList';

import Cart from './components/Cart';
import LoginForm from './components/Login';
import UpdateProduct from './components/UpdateProduct';
import Category from './components/Category';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);