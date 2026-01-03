import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// Main pages
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';

// Shared layout components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Utility component to ensure the page scrolls to top when navigating
import ScrollToTop from './components/ScrollToTop';

// Context provider to manage favourites globally across the app
import { FavoritesProvider } from './context/FavoritesContext';

// Global application styles
import './App.css'; 

function App() {
  return (
    // Wrap the entire application with the Favourites context
    // so any component can add or remove favourite properties
    <FavoritesProvider>

      {/* React Router handles client-side navigation */}
      <Router>

        {/* Ensures each page starts at the top when routes change */}
        <ScrollToTop />
        
        <div className="app-wrapper">
          
          {/* 
            Simple branding bar displayed at the very top of the page.
            Inline styling is used here to keep branding-specific styles
            separate from layout styles defined in App.css.
          */}
          <div
            className="top-bar"
            style={{
              backgroundColor: 'var(--primary-color)', // Uses theme variable from App.css
              color: 'white',
              textAlign: 'center',
              fontSize: '0.8rem',
              padding: '8px 0',
              letterSpacing: '1px',
              fontWeight: '500',
              textTransform: 'uppercase'
            }}
          >
            Welcome to DreamEstate — The UK's No.1 Property Platform
          </div>
          
          {/* Main navigation bar shown on all pages */}
          <NavBar /> 
          
          {/* 
            Main content area where routed pages are rendered.
            This section grows to fill available vertical space
            between the header and footer.
          */}
          <div className="main-content-area">
            <Routes>
              {/* Home page containing search and results */}
              <Route path="/" element={<Home />} />

              {/* Individual property details page */}
              <Route path="/property/:id" element={<PropertyDetails />} />
            </Routes>
          </div>
          
          {/* Footer displayed consistently across the site */}
          <Footer />
          
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
