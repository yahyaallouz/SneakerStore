const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper to generate tracking number
const generateTrackingNumber = () => {
    const randomNum = Math.floor(Math.random() * 900 + 100); // 100-999
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
    return `TRK${randomNum}${randomLetter}`;
};

// Create Order (Guest or User)
router.post('/', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const { user_email, items, total, payment_method } = req.body;
        console.log('Received Order Payload:', JSON.stringify(req.body, null, 2)); // Debug logging
        // items: [{ product_id, quantity, size, price }]

        const trackingNumber = generateTrackingNumber();

        // Create Order
        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_email, total, payment_method, tracking_number) VALUES (?, ?, ?, ?)',
            [user_email, total, payment_method || 'Card', trackingNumber]
        );
        const orderId = orderResult.insertId;

        for (const item of items) {
            await connection.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, size, price_at_purchase) VALUES (?, ?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.size || 'N/A', item.price]
            );
        }

        await connection.commit();
        res.status(201).json({ message: 'Order created', orderId, trackingNumber });

    } catch (error) {
        await connection.rollback();
        const fs = require('fs');
        const logMessage = `[${new Date().toISOString()}] SQL Error: ${error.message}\nStack: ${error.stack}\nPayload: ${JSON.stringify(req.body)}\n\n`;
        fs.appendFileSync('error.log', logMessage);

        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Failed to place order: ' + error.message });
    } finally {
        if (connection) connection.release();
    }
});

// Get Order Status by Tracking Number (Public)
router.get('/track/:trackingNumber', async (req, res) => {
    try {
        console.log('Tracking Request:', req.params.trackingNumber);

        const [rows] = await db.execute(
            'SELECT status, tracking_number, created_at, total, user_email FROM orders WHERE tracking_number = ?',
            [req.params.trackingNumber]
        );

        console.log('Found rows:', rows.length);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Tracking Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get All Orders (Admin)
router.get('/', async (req, res) => {
    try {
        const [orders] = await db.execute('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Order Status (Admin)
router.put('/:id/status', async (req, res) => {
    const { status } = req.body;
    try {
        await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Order status updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Analytics Endpoint
// Analytics Endpoint
router.get('/analytics', async (req, res) => {
    try {
        const { period } = req.query;
        let days = 7;
        if (period === '1m') days = 30;
        else if (period === '3m') days = 90;
        else if (period === '1y') days = 365;

        // Calculate start date
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const [rows] = await db.execute(
            `SELECT 
                DATE_FORMAT(created_at, '%Y-%m-%d') as date, 
                SUM(CASE WHEN status != 'Refunded' THEN total ELSE 0 END) as sales, 
                COUNT(CASE WHEN status != 'Refunded' THEN 1 END) as orders,
                COUNT(CASE WHEN status = 'Refunded' THEN 1 END) as refunds
             FROM orders 
             WHERE created_at >= ? 
             GROUP BY DATE(created_at) 
             ORDER BY date ASC`,
            [startDate]
        );

        const formattedRows = rows.map(row => ({
            date: row.date,
            sales: Number(row.sales),
            orders: Number(row.orders),
            refunds: Number(row.refunds)
        }));

        // Calculate Totals
        const totalSales = formattedRows.reduce((sum, item) => sum + item.sales, 0);
        const totalOrders = formattedRows.reduce((sum, item) => sum + item.orders, 0);
        const totalRefunds = formattedRows.reduce((sum, item) => sum + item.refunds, 0);

        res.json({
            totalSales,
            totalOrders,
            totalRefunds,
            timeSeries: formattedRows
        });
    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get Single Order Details
router.get('/:id', async (req, res) => {
    try {
        const [orders] = await db.execute('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        if (orders.length === 0) return res.status(404).json({ message: 'Order not found' });

        const [items] = await db.execute(
            `SELECT oi.*, p.name, p.brand, p.image, p.image_url 
             FROM order_items oi 
             LEFT JOIN products p ON oi.product_id = p.id 
             WHERE oi.order_id = ?`,
            [req.params.id]
        );

        res.json({ ...orders[0], items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
