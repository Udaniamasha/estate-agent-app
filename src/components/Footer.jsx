import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* Column 1: Brand & About */}
        <div className="footer-col">
          <h3>Dream<span style={{color: '#0056b3'}}>Estate</span></h3>
          <p>
            Your trusted partner in finding the perfect home. 
            Search thousands of properties for sale and to rent 
            from top estate agents.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Properties for Sale</Link></li>
            <li><Link to="/">Properties to Rent</Link></li>
            <li><Link to="/">Find an Agent</Link></li>
            <li><Link to="/">Commercial Property</Link></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Mortgage Calculator</a></li>
            <li><a href="#">Property Valuation</a></li>
            <li><a href="#">Market Trends</a></li>
            <li><a href="#">Help & Support</a></li>
          </ul>
        </div>

        {/* Column 4: Contact/Legal */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>123 High Street, London, UK</p>
          <p>Email: info@dreamestate.co.uk</p>
          <div className="social-icons">
            {/* Simple text placeholders for icons */}
            <span>FB</span> <span>TW</span> <span>IG</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DreamEstate. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Cookies</a></p>
      </div>
    </footer>
  );
};

export default Footer;