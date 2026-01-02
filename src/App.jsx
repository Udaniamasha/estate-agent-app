import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.css'; 

function App() {
  return (
    <FavoritesProvider>
      <Router>
        {/* Helper to reset scroll position on route change */}
        <ScrollToTop />
        
        <div className="app-wrapper">
          
          {/* BRAND TOP BAR */}
          <div className="top-bar" style={{
            backgroundColor: 'var(--primary-color)', /* Uses your App.css theme color */
            color: 'white', 
            textAlign: 'center', 
            fontSize: '0.8rem', 
            padding: '8px 0', 
            letterSpacing: '1px', 
            fontWeight: '500', 
            textTransform: 'uppercase'
          }}>
            Welcome to DreamEstate — The UK's No.1 Property Platform
          </div>
          
          {/* 1. HEADER (Spans 100% width) */}
          <NavBar /> 
          
          {/* 2. MAIN CONTENT (Grows to fill space) */}
          <div className="main-content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
            </Routes>
          </div>
          
          {/* 3. FOOTER (Spans 100% width) */}
          <Footer />
          
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;