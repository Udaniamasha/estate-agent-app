import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.css'; 

function App() {
  return (
    <FavoritesProvider>
      <Router>
        {/* The Wrapper holds everything but allows full width */}
        <div className="app-wrapper">
          
          {/* 1. HEADER (Will now span 100% width) */}
          <NavBar /> 
          
          {/* 2. MAIN CONTENT (Grows to fill space) */}
          <div className="main-content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
            </Routes>
          </div>
          
          {/* 3. FOOTER (Will now span 100% width) */}
          <Footer />
          
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;