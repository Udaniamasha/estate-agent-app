import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

// Responsive navigation bar that adapts between desktop and mobile views
const NavBar = () => {
  // Track whether the mobile menu is currently open
  const [isOpen, setIsOpen] = useState(false);

  // Track whether the page has been scrolled down
  // Used to apply a subtle shadow or background change when scrolling
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle the mobile menu open/closed when the hamburger icon is clicked
  const toggleMenu = () => setIsOpen(!isOpen);

  // Add a scroll event listener that updates state when user scrolls past 20px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Clean up listener on unmount to prevent memory leaks
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">

        {/* Logo text - clicking it always closes the mobile menu */}
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          Dream<span style={{ color: '#00d68f' }}>Estate</span>
        </Link>

        {/* Hamburger icon only visible on mobile view */}
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

        {/* Navigation links list */}
        {/* Uses conditional class to slide in/out on mobile */}
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
          {/* Example call-to-action button styled differently in CSS */}
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
