import React from 'react';
import ReactDOM from 'react-dom/client';
//import { createRoot } from 'react-dom/client';
//import { compose } from 'redux';
import { configureStore, applyMiddleware, compose, getDefaultMiddleware, createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import './index.css';
import App from './App';


const store = createStore(reducers, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <App />
  </Provider>,
  //document.getElementById('root'),

  /*
    <React.StrictMode>
      <App />
    </React.StrictMode>
  */
);
