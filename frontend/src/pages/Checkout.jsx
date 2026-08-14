import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { CreditCard, Banknote, Wallet } from 'lucide-react';
import '../styles/Checkout.css';

const Checkout = () => {
    const { cart, total, clearCart } = useCart();
    const { placeOrder } = useOrder();
    const navigate = useNavigate();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Card'); // Card, PayPal, COD
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        card: '',
        exp: '',
        cvc: ''
    });

    // Move redirect logic to useEffect to handle dependencies and state changes properly
    useEffect(() => {
        if (cart.length === 0 && !isOrderPlaced) {
            navigate('/');
        }
    }, [cart, isOrderPlaced, navigate]);

    // Render nothing while redirecting if cart is empty and order not placed
    if (cart.length === 0 && !isOrderPlaced) {
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation based on method
        if (paymentMethod === 'Card') {
            if (!formData.card || !formData.exp || !formData.cvc) {
                alert('Please fill in card details');
                return;
            }
        }

        const orderData = {
            user_email: formData.email,
            total: total,
            payment_method: paymentMethod,
            items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                size: item.size,
                price: item.price
            }))
        };

        console.log('Sending Order Data:', orderData); // DEBUG LOG FOR USER


        const result = await placeOrder(orderData);

        if (result.success) {
            setIsOrderPlaced(true); // Prevent redirect to home
            clearCart();
            navigate('/thank-you', { state: { tracking_number: result.tracking_number } });
        } else {
            alert('Payment failed: ' + result.message);
        }
    };

    return (
        <div className="checkout-screen">
            <div className="checkout-split">
                {/* Left Side - Form */}
                <div className="checkout-main">
                    <div className="checkout-header">
                        <h1 className="logo-text">SNEAKER STORE</h1>
                        <div className="breadcrumb-checkout">
                            <span>Cart</span> &gt; <span>Information</span> &gt; <span>Payment</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="checkout-form">
                        <section className="form-section">
                            <h3>Contact Information</h3>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" name="email" required onChange={handleChange} placeholder="john@example.com" />
                            </div>
                        </section>

                        <section className="form-section">
                            <h3>Shipping Address</h3>
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>First name</label>
                                    <input type="text" name="firstName" required onChange={handleChange} />
                                </div>
                                <div className="form-group half">
                                    <label>Last name</label>
                                    <input type="text" name="lastName" required onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" name="address" required onChange={handleChange} placeholder="123 Main St" />
                            </div>
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>City</label>
                                    <input type="text" name="city" required onChange={handleChange} />
                                </div>
                                <div className="form-group half">
                                    <label>Postal Code</label>
                                    <input type="text" name="zip" required onChange={handleChange} />
                                </div>
                            </div>
                        </section>

                        <section className="form-section">
                            <h3>Payment Method</h3>

                            <div className="payment-selector">
                                <div
                                    className={`payment-method-card ${paymentMethod === 'Card' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('Card')}
                                >
                                    <CreditCard className="payment-icon" size={24} />
                                    <span className="payment-label">Card</span>
                                </div>
                                <div
                                    className={`payment-method-card ${paymentMethod === 'PayPal' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('PayPal')}
                                >
                                    <Wallet className="payment-icon" size={24} />
                                    <span className="payment-label">PayPal</span>
                                </div>
                                <div
                                    className={`payment-method-card ${paymentMethod === 'COD' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('COD')}
                                >
                                    <Banknote className="payment-icon" size={24} />
                                    <span className="payment-label">COD</span>
                                </div>
                            </div>

                            <div className="payment-details">
                                {paymentMethod === 'Card' && (
                                    <div className="card-form">
                                        <div className="form-group">
                                            <label>Card number</label>
                                            <input type="text" name="card" placeholder="0000 0000 0000 0000" onChange={handleChange} />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group half">
                                                <label>Expiration</label>
                                                <input type="text" name="exp" placeholder="MM / YY" onChange={handleChange} />
                                            </div>
                                            <div className="form-group half">
                                                <label>CVC</label>
                                                <input type="text" name="cvc" placeholder="123" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'PayPal' && (
                                    <div className="paypal-message">
                                        <p>You will be redirected to PayPal to complete your purchase securely.</p>
                                    </div>
                                )}

                                {paymentMethod === 'COD' && (
                                    <div className="cod-message">
                                        <p>Pay with cash upon delivery. Please ensure you have the exact amount.</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <div className="form-actions">
                            <span className="return-link" onClick={() => navigate('/cart')}>&lt; Return to cart</span>
                            <button type="submit" className="pay-btn">
                                {paymentMethod === 'COD' ? 'Place Order' : `Pay $${total.toFixed(2)}`}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Side - Summary */}
                <div className="checkout-sidebar">
                    <div className="sidebar-content">
                        <div className="order-items">
                            {cart.map(item => (
                                <div key={`${item.id}-${item.size}`} className="order-item">
                                    <div className="item-img-wrapper">
                                        <img src={item.image} alt={item.name} />
                                        <span className="item-qty-badge">{item.quantity}</span>
                                    </div>
                                    <div className="item-info">
                                        <p className="item-name">{item.name}</p>
                                        <p className="item-size">{item.size}</p>
                                    </div>
                                    <p className="item-price-small">${item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="order-totals">
                            <div className="total-row">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="total-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="total-row final">
                                <span>Total</span>
                                <span className="final-price">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
