const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sneaker_store'
};

async function checkProducts() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM products');
        console.log('Product Count:', rows[0].count);

        const [products] = await connection.execute('SELECT id, name FROM products LIMIT 3');
        console.log('Sample Products:', products);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (connection) await connection.end();
    }
}

checkProducts();
