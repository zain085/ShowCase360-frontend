import React from 'react';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark border-top border-purple text-light py-4 mt-5">
      <div className="container text-center">

        {/* Social Icons */}
        <div className="mb-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-purple me-3 fs-5">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-purple me-3 fs-5">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-purple me-3 fs-5">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-purple fs-5">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>

        {/* Legal Links */}
        <div className="mb-2">
          <Link to="/privacy-policy" className="text-purple me-3 text-decoration-none">Privacy Policy</Link>
          <Link to="/terms" className="text-purple text-decoration-none">Terms & Conditions</Link>
        </div>

        {/* Branding */}
        <p className="mb-1">© {new Date().getFullYear()} EventSphere Management</p>
        <small className="text-secondary">Empowering Expos, One Experience at a Time</small>
      </div>
    </footer>
  );
};

export default Footer;
