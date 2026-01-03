import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

// Footer displayed on all pages
// Provides site links, contact info, and branding
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* --- Column 1: Brand Info --- */}
        <div className="footer-col">
          <h3>
            Dream<span style={{ color: '#00d68f' }}>Estate</span>
          </h3>
          <p>
            Your trusted partner in finding the perfect home.
            Search thousands of properties for sale and to rent
            from top estate agents.
          </p>
        </div>

        {/* --- Column 2: Quick Links --- */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          {/* Internal navigation links using React Router */}
          <ul>
            <li><Link to="/">Properties for Sale</Link></li>
            <li><Link to="/">Properties to Rent</Link></li>
            <li><Link to="/">Find an Agent</Link></li>
            <li><Link to="/">Commercial Property</Link></li>
          </ul>
        </div>

        {/* --- Column 3: Resources --- */}
        <div className="footer-col">
          <h4>Resources</h4>
          {/* These use <a> tags because they could point to external resources */}
          <ul>
            <li><a href="#">Mortgage Calculator</a></li>
            <li><a href="#">Property Valuation</a></li>
            <li><a href="#">Market Trends</a></li>
            <li><a href="#">Help & Support</a></li>
          </ul>
        </div>

        {/* --- Column 4: Contact Info --- */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>123 High Street, London, UK</p>
          <p>Email: info@dreamestate.co.uk</p>

          {/* Placeholder social icons – could later be replaced by actual SVGs or icons */}
          <div className="social-icons">
            <span>FB</span> <span>TW</span> <span>IG</span>
          </div>
        </div>
      </div>
      
      {/* Footer bottom row with copyright and policy links */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} DreamEstate. All rights reserved. |{' '}
          <a href="#">Privacy Policy</a> | <a href="#">Cookies</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
