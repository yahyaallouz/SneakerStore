const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sneaker_store'
};

async function testOrder() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected.');

        // 1. Check Products
        const [products] = await connection.execute('SELECT id, name FROM products LIMIT 5');
        console.log('Existing Products:', products);

        if (products.length === 0) {
            console.error('ERROR: No products found in database! Order creation will fail due to foreign key constraint.');
            return;
        }

        const validProductId = products[0].id;
        console.log('Testing insertion with Product ID:', validProductId);

        // 2. Test Order Insert
        const trackingNumber = 'TEST-' + Date.now();
        console.log('Generated Tracking:', trackingNumber);

        // Start Transaction
        await connection.beginTransaction();

        // Insert Order
        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_email, total, payment_method, tracking_number) VALUES (?, ?, ?, ?)',
            ['test@example.com', 100.00, 'Card', trackingNumber]
        );
        const orderId = orderResult.insertId;
        console.log('Order inserted, ID:', orderId);

        // Insert Order Item
        await connection.execute(
            'INSERT INTO order_items (order_id, product_id, quantity, size, price_at_purchase) VALUES (?, ?, ?, ?, ?)',
            [orderId, validProductId, 1, '10', 100.00]
        );
        console.log('Order Item inserted.');

        await connection.commit();
        console.log('SUCCESS: Test order placed successfully.');

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('FAILED:', error.message);
    } finally {
        if (connection) await connection.end();
    }
}

testOrder();
