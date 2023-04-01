
import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './App';

// Create redux store using thunk and provided reducers
const store = createStore(reducers, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <App />
  </Provider>,
);
