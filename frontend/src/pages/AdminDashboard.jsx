import React, { useState, useMemo } from 'react';
import { useProduct } from '../context/ProductContext';
import { useOrder } from '../context/OrderContext';
import AdminProductForm from '../components/AdminProductForm';
import DashboardChart from '../components/DashboardChart';
import { ShoppingBag, DollarSign, AlertCircle, Trash2, Edit, Eye, X } from 'lucide-react';
import { BASE_URL } from '../utils/api';
import '../styles/AdminDashboard.css';

const getImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http') || img.startsWith('data:')) return img;
    return `${BASE_URL}${img}`;
};

const AdminDashboard = () => {
    const { products, deleteProduct } = useProduct();
    const { orders, updateOrderStatus } = useOrder();
    const [activeTab, setActiveTab] = useState('overview');
    const [editingProduct, setEditingProduct] = useState(null);
    const [showProductForm, setShowProductForm] = useState(false);

    // Analytics & Details State
    const [period, setPeriod] = useState('7d');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    // Calculate stats purely from client-side orders
    const displayStats = useMemo(() => {
        const now = new Date();
        const days = period === '1m' ? 30 : period === '3m' ? 90 : period === '1y' ? 365 : 7;

        // Calculate start date properly
        const startDate = new Date();
        startDate.setDate(now.getDate() - days);

        // Filter orders strictly within the range
        const filteredOrders = orders.filter(o => new Date(o.created_at) >= startDate);

        const totalSales = filteredOrders
            .filter(o => o.status !== 'Refunded')
            .reduce((sum, o) => sum + Number(o.total || 0), 0);

        const totalOrders = filteredOrders.filter(o => o.status !== 'Refunded').length;
        const totalRefunds = filteredOrders.filter(o => o.status === 'Refunded').length;

        // Generate FULL timeline including empty days (filling gaps with 0)
        const timelineMap = {};
        for (let d = 0; d <= days; d++) {
            const dateCursor = new Date(startDate);
            dateCursor.setDate(dateCursor.getDate() + d);
            const dateStr = dateCursor.toLocaleDateString('en-CA'); // YYYY-MM-DD local time
            timelineMap[dateStr] = 0;
        }

        // Fill in actual sales data
        filteredOrders.forEach(o => {
            if (o.status === 'Refunded') return;
            const date = new Date(o.created_at).toLocaleDateString('en-CA');
            if (timelineMap[date] !== undefined) {
                timelineMap[date] += Number(o.total || 0);
            }
        });

        const timeSeries = Object.keys(timelineMap).sort().map(date => ({
            date,
            sales: timelineMap[date]
        }));

        return { totalSales, totalOrders, totalRefunds, timeSeries };
    }, [orders, period]);

    const { totalSales, totalOrders, totalRefunds, timeSeries } = displayStats;

    const handleViewOrder = (id) => {
        const localOrder = orders.find(o => o.id === id);
        if (localOrder) {
            setSelectedOrder(localOrder);
            setShowOrderModal(true);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowProductForm(true);
    };

    const handleCloseForm = () => {
        setEditingProduct(null);
        setShowProductForm(false);
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</li>
                    <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</li>
                    <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</li>
                </ul>
            </div>

            <div className="admin-content">
                {activeTab === 'overview' && (
                    <div className="overview-section">
                        <h1>Dashboard Overview</h1>

                        <div className="chart-controls">
                            {['7d', '1m', '3m', '1y'].map(p => (
                                <button
                                    key={p}
                                    className={`period-btn ${period === p ? 'active' : ''}`}
                                    onClick={() => setPeriod(p)}
                                >
                                    {p.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <DashboardChart data={timeSeries} />

                        <div className="stats-grid">
                            <div className="stat-card">
                                <DollarSign size={24} color="var(--success)" />
                                <div>
                                    <h3>Total Sales</h3>
                                    <p>${totalSales.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <ShoppingBag size={24} color="var(--primary)" />
                                <div>
                                    <h3>Total Orders</h3>
                                    <p>{totalOrders}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <AlertCircle size={24} color="var(--warning)" />
                                <div>
                                    <h3>Refunds</h3>
                                    <p>{totalRefunds}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="products-section">
                        <div className="section-header">
                            <h1>Products</h1>
                            <button className="add-btn" onClick={() => setShowProductForm(true)}>+ Add Product</button>
                        </div>

                        {showProductForm && (
                            <AdminProductForm
                                product={editingProduct}
                                onClose={handleCloseForm}
                            />
                        )}

                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>
                                                <img
                                                    src={getImageUrl(product.image || product.image_url)}
                                                    alt={product.name}
                                                    className="table-img"
                                                />
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.brand}</td>
                                            <td>${Number(product.price).toFixed(2)}</td>
                                            <td>{product.category}</td>
                                            <td>
                                                <button className="icon-btn-sm edit" onClick={() => handleEditProduct(product)}><Edit size={16} /></button>
                                                <button className="icon-btn-sm delete" onClick={() => handleDeleteProduct(product.id)}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="orders-section">
                        <h1>Orders</h1>
                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>#{order.id}</td>
                                            <td>{order.user_email}</td>
                                            <td>${Number(order.total).toFixed(2)}</td>
                                            <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                                            <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <button className="icon-btn-sm edit" onClick={() => handleViewOrder(order.id)} title="View Details">
                                                    <Eye size={16} />
                                                </button>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="status-select"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Refunded">Refunded</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {showOrderModal && selectedOrder && (
                    <div className="order-modal-overlay" onClick={() => setShowOrderModal(false)}>
                        <div className="order-modal-content" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Order #{selectedOrder.id} Details</h2>
                                <button className="close-btn" onClick={() => setShowOrderModal(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '2rem', color: 'var(--text-secondary)' }}>
                                <div>
                                    <strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleString()}
                                </div>
                                <div>
                                    <strong>Customer:</strong> {selectedOrder.user_email}
                                </div>
                                <div>
                                    <strong>Total:</strong> ${Number(selectedOrder.total).toFixed(2)}
                                </div>
                                <div>
                                    <strong>Tracking:</strong> {selectedOrder.tracking_number}
                                </div>
                            </div>

                            <div className="order-items-list">
                                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                                    selectedOrder.items.map((item, index) => (
                                        <div key={index} className="order-item">
                                            <img
                                                src={getImageUrl(item.image || item.image_url)}
                                                alt={item.name}
                                                className="item-img"
                                            />
                                            <div className="item-details">
                                                <h4>{item.name || 'Product Not Found'}</h4>
                                                <p className="item-meta">
                                                    Size: {item.size} • Qty: {item.quantity} • {item.price}
                                                </p>
                                            </div>
                                            <div className="item-price">
                                                ${Number(item.price).toFixed(2)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                        <p>No items in this order.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
