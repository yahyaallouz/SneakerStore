import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import OrderTracking from './pages/OrderTracking';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import './index.css';

// Wrapper for Navbar to access context
const NavbarWrapper = ({ theme, toggleTheme }) => {
    const { count } = useCart();
    return <Navbar theme={theme} toggleTheme={toggleTheme} cartCount={count} />;
};

function App() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <AuthProvider>
            <ProductProvider>
                <OrderProvider>
                    <CartProvider>
                        <Router>
                            <div className="App">
                                <NavbarWrapper theme={theme} toggleTheme={toggleTheme} />
                                <CartDrawer />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/admin-login" element={<Login adminMode={true} />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/admin" element={
                                        <ProtectedRoute>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/product/:id" element={<ProductDetails />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/thank-you" element={<ThankYou />} />
                                    <Route path="/track-order" element={<OrderTracking />} />
                                    <Route path="/men" element={<Men />} />
                                    <Route path="/women" element={<Women />} />
                                    <Route path="/kids" element={<Kids />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/terms" element={<Terms />} />
                                </Routes>

                                <Footer />
                            </div>
                        </Router>
                    </CartProvider>
                </OrderProvider>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
