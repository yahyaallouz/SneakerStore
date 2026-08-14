import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, Search, AlertCircle } from 'lucide-react';
import '../styles/OrderTracking.css';

const OrderTracking = () => {
    const [searchParams] = useSearchParams();
    const [trackingNumber, setTrackingNumber] = useState(searchParams.get('id') || '');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    // Auto-search if parameter exists
    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setTrackingNumber(id);
            handleTrack(id);
        }
    }, [searchParams]);

    const handleTrack = async (idToTrack) => {
        const id = idToTrack || trackingNumber;
        if (!id) return;

        setLoading(true);
        setError('');
        setOrder(null);
        setSearched(true);

        try {
            const { api } = await import('../utils/api');
            const foundOrder = await api.get(`/orders/track/${id}`);

            if (foundOrder) {
                setOrder(foundOrder);
            } else {
                throw new Error('Order not found');
            }
        } catch (err) {
            setError('Order not found. Please check your tracking number.');
        } finally {
            setLoading(false);
        }
    };

    const getStepStatus = (stepName, currentStatus) => {
        const steps = ['Pending', 'Shipped', 'Delivered'];
        const currentIndex = steps.indexOf(currentStatus);
        const stepIndex = steps.indexOf(stepName);

        if (currentStatus === 'Refunded') return 'inactive'; // Special case

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return 'inactive';
    };

    return (
        <div className="tracking-page">
            <div className="tracking-header">
                <h1>Track Your Order</h1>
                <p>Enter your tracking number to see where your package is.</p>
            </div>

            <div className="tracking-search">
                <input
                    type="text"
                    className="tracking-input"
                    placeholder="Enter Tracking ID"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                />
                <button
                    className="search-btn"
                    onClick={() => handleTrack()}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Track'}
                </button>
            </div>

            {error && (
                <div className="status-error">
                    <AlertCircle size={24} style={{ marginBottom: '10px' }} />
                    <p>{error}</p>
                </div>
            )}

            {order && (
                <div className="tracking-result">
                    <div className="result-header">
                        <div className="order-id">
                            Tracking ID: <span>{order.tracking_number}</span>
                        </div>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                        </span>
                    </div>

                    <div className="status-timeline">
                        {order.status === 'Refunded' ? (
                            <div className="timeline-step active">
                                <div className="step-icon" style={{ background: '#DC2626', color: 'white' }}>
                                    <AlertCircle size={20} />
                                </div>
                                <div className="step-content">
                                    <h4>Refunded</h4>
                                    <p>This order has been refunded.</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className={`timeline-step ${getStepStatus('Pending', order.status)}`}>
                                    <div className="step-icon">
                                        <Clock size={20} />
                                    </div>
                                    <div className="step-content">
                                        <h4>Order Placed</h4>
                                        <p>We have received your order.</p>
                                    </div>
                                </div>

                                <div className={`timeline-step ${getStepStatus('Shipped', order.status)}`}>
                                    <div className="step-icon">
                                        <Truck size={20} />
                                    </div>
                                    <div className="step-content">
                                        <h4>Shipped</h4>
                                        <p>Your item is on the way.</p>
                                    </div>
                                </div>

                                <div className={`timeline-step ${getStepStatus('Delivered', order.status)}`}>
                                    <div className="step-icon">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div className="step-content">
                                        <h4>Delivered</h4>
                                        <p>Package has been delivered.</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                        <p>Total Amount: <strong>${Number(order.total).toFixed(2)}</strong></p>
                        <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTracking;
