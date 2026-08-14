import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, Package, Home, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';
import '../styles/ThankYou.css';

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tracking_number: trackingNumber } = location.state || {};
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCopy = () => {
        if (trackingNumber) {
            navigator.clipboard.writeText(trackingNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="thank-you-container">
            <div className="thank-you-card glass">
                <div className="success-icon-wrapper">
                    <div className="success-icon-ring"></div>
                    <div className="success-icon-bg">
                        <Check size={48} strokeWidth={3} className="success-icon" />
                    </div>
                </div>

                <h1 className="thank-you-title">Order Placed!</h1>
                <p className="thank-you-subtitle">
                    Thank you for your purchase. Your order has been securely processed.
                </p>

                {trackingNumber && (
                    <div className="tracking-section">
                        <p className="tracking-label">Tracking Number</p>
                        <div className="tracking-display" onClick={handleCopy} title="Click to copy">
                            <span className="tracking-code">{trackingNumber}</span>
                            <button className="copy-btn">
                                {copied ? <CheckCircle2 size={18} className="text-green" /> : <Copy size={18} />}
                            </button>
                        </div>
                        {copied && <span className="copy-feedback">Copied to clipboard!</span>}
                    </div>
                )}

                <div className="order-actions">
                    <Link to="/track-order" className="action-btn track-btn">
                        <Package size={20} />
                        <span>Track Order</span>
                    </Link>

                    <Link to="/" className="action-btn home-btn">
                        <Home size={20} />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

                <p className="email-hint">
                    A confirmation email has been sent to your inbox.
                </p>
            </div>

            {/* Background elements for visual flair */}
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
        </div>
    );
};

export default ThankYou;
