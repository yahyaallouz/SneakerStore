import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer glass">
            <div className="footer-content">
                <div className="brand-section">
                    <h3>SNEAKER<span>HEAD</span></h3>
                    <p>Premium Kicks Only.</p>
                </div>
                <div className="links">
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/terms">Terms</Link>
                    <Link to="/track-order">Track Order</Link>
                    <Link to="/admin-login" className="admin-footer-link">Admin Login</Link>
                </div>
            </div>
            <div className="copy">
                &copy; 2026 SneakerHead. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

