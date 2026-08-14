import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api } from '../utils/api';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        totalSales: 0,
        refunds: 0,
        lowStock: 0
    });

    const calculateStats = (data) => {
        const totalSales = data
            .filter(o => o.status !== 'Refunded')
            .reduce((sum, o) => sum + Number(o.total), 0);

        const refunds = data.filter(o => o.status === 'Refunded').length;

        setStats({ totalSales, refunds, lowStock: 0 });
    };

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const data = await api.get('/orders');
            setOrders(data);
            calculateStats(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const placeOrder = useCallback(async (orderData) => {
        try {
            const response = await api.post('/orders', orderData);
            fetchOrders();
            return { 
                success: true, 
                orderId: response.orderId, 
                tracking_number: response.trackingNumber 
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }, [fetchOrders]);

    const updateOrderStatus = useCallback(async (id, status) => {
        try {
            await api.put(`/orders/${id}/status`, { status });
            fetchOrders();
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }, [fetchOrders]);

    return (
        <OrderContext.Provider value={{ orders, stats, loading, fetchOrders, placeOrder, updateOrderStatus }}>
            {children}
        </OrderContext.Provider>
    );
};
