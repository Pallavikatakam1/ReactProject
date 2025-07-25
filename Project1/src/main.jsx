import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
);