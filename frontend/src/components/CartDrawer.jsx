import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BASE_URL } from '../utils/api';
import { X, Minus, Plus } from 'lucide-react';
import '../styles/CartDrawer.css';

const CartDrawer = () => {
    const {
        isDrawerOpen,
        closeDrawer,
        cart,
        removeFromCart,
        updateQuantity,
        total
    } = useCart();

    const navigate = useNavigate();
    const drawerRef = useRef();

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                closeDrawer();
            }
        };

        if (isDrawerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDrawerOpen, closeDrawer]);

    const handleCheckout = () => {
        closeDrawer();
        navigate('/checkout');
    };

    const handleViewCart = () => {
        closeDrawer();
        navigate('/cart');
    };

    return (
        <div className={`cart-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}>
            <div className={`cart-drawer ${isDrawerOpen ? 'open' : ''}`} ref={drawerRef}>
                <div className="drawer-header">
                    <h2>Your Cart</h2>
                    <button className="close-btn" onClick={closeDrawer}><X size={24} /></button>
                </div>

                <div className="drawer-items">
                    {cart.length === 0 ? (
                        <div className="empty-drawer">
                            <p>Your cart is empty.</p>
                            <button onClick={closeDrawer} className="start-shopping-btn">Start Shopping</button>
                        </div>
                    ) : (
                        cart.map((item, index) => {
                            const imageUrl = item.image || item.image_url;
                            const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`;

                            return (
                                <div key={`${item.id}-${item.size}-${index}`} className="drawer-item">
                                    <img
                                        src={fullImageUrl || 'https://via.placeholder.com/100?text=No+Image'}
                                        alt={item.name}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Error'; }}
                                    />
                                    <div className="drawer-item-details">
                                        <h4>{item.name}</h4>
                                        <p className="item-variant">{item.brand} / {item.size}</p>
                                        <div className="drawer-qty-control">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                                        </div>
                                    </div>
                                    <div className="drawer-item-right">
                                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                                        <button className="drawer-remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="drawer-footer">
                        <div className="drawer-total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <p className="shipping-note">Taxes and shipping calculated at checkout</p>

                        <div className="drawer-actions">
                            <button className="checkout-btn-drawer" onClick={handleCheckout}>Checkout</button>
                            <button className="view-cart-btn-drawer" onClick={handleViewCart}>View Cart</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
