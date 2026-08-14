import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BASE_URL } from '../utils/api';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="cart-page empty">
                <h2>Your cart is empty</h2>
                <Link to="/" className="continue-btn">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>

            <div className="cart-container">
                <div className="cart-items">
                    {cart.map((item, index) => {
                        const imageUrl = item.image || item.image_url;
                        const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`;

                        return (
                            <div key={`${item.id}-${item.size}-${index}`} className="cart-item glass">
                                <img
                                    src={fullImageUrl || 'https://via.placeholder.com/150?text=No+Image'}
                                    alt={item.name}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Error'; }}
                                />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">${item.price}</p>
                                    {item.size && <p className="item-size">Size: {item.size}</p>}
                                </div>

                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>

                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                            </div>
                        );
                    })}
                </div>

                <div className="cart-summary glass">
                    <h3>Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
