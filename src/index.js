import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import TokencontextProvider from './context/tokenContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContentProvider from './context/cartContent';

const root = ReactDOM.createRoot(document.getElementById('root'));



let query = new QueryClient ()

root.render(
  <CartContentProvider>
  <React.StrictMode>
    <QueryClientProvider client={query}>
   <TokencontextProvider>
   <App />
   </TokencontextProvider>
   </QueryClientProvider>
   </React.StrictMode>
  </CartContentProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
