import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import PropertyDetails from '../components/PropertyDetails';
import './App.css'; // Keep your styles if you want them

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* You can add a permanent Header/Navbar here later */}
        <header style={{ padding: '1rem', backgroundColor: '#eee', marginBottom: '1rem' }}>
          <h2>Estate Agent App</h2>
        </header>

        <main>
          <Routes>
            {/* Route for the Home/Search Page */}
            <Route path="/" element={<SearchPage />} />
            
            {/* Route for individual Property Details */}
            {/* :id is a variable parameter */}
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;