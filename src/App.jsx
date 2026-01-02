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
        <div className="app-wrapper">
          {/* Header spans full width */}
          <NavBar /> 
          
          {/* Main grows to fill space, but doesn't restrict width yet */}
          <main className="main-content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
            </Routes>
          </main>
          
          {/* Footer spans full width */}
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;