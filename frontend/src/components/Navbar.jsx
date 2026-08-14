import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Moon, Sun, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { openDrawer, cartCount } = useCart();
    const { user, logout, isAdmin } = useAuth();
    const location = useLocation();

    return (
        <nav className="navbar glass">
            <div className="logo">
                <Link to="/">SNEAKER<span>HEAD</span></Link>
            </div>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/men" className={location.pathname === '/men' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Men</Link>
                <Link to="/women" className={location.pathname === '/women' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Women</Link>
                <Link to="/kids" className={location.pathname === '/kids' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Kids</Link>
                <Link to="/track-order" className={location.pathname === '/track-order' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Track Order</Link>
                {isAdmin && (
                    <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                )}
            </div>

            <div className="nav-actions">
                <button onClick={toggleTheme} className="icon-btn theme-toggle">
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {user ? (
                    <button onClick={logout} className="login-btn-nav">Logout</button>
                ) : (
                    <Link to="/login" className="login-btn-nav">Login</Link>
                )}

                <button className="icon-btn cart-btn" onClick={openDrawer}>
                    <ShoppingCart size={20} />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>

                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
