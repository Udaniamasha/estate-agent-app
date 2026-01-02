import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 
// IMPORT THE PROVIDER
import { FavoritesProvider } from './context/FavoritesContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* WRAP APP IN PROVIDER */}
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>
);