import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Add scroll listener for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          Dream<span style={{ color: '#00d68f' }}>Estate</span>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <div
          className={`menu-icon ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          role="button"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Links */}
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={toggleMenu}>
              Buy
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={toggleMenu}>
              Rent
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-links" onClick={toggleMenu}>
              House Prices
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-links" onClick={toggleMenu}>
              Agent Finder
            </a>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-button" onClick={toggleMenu}>
              Sign In
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default NavBar;