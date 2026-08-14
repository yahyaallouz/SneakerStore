const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sneaker_store'
};

async function addTrackingColumn() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database.');

        // Check if column exists
        const [rows] = await connection.execute(
            "SHOW COLUMNS FROM orders LIKE 'tracking_number'"
        );

        if (rows.length === 0) {
            await connection.execute(
                "ALTER TABLE orders ADD COLUMN tracking_number VARCHAR(50) UNIQUE AFTER id"
            );
            console.log('Successfully added tracking_number column to orders table.');
        } else {
            console.log('tracking_number column already exists.');
        }

    } catch (error) {
        console.error('Error updating database:', error);
    } finally {
        if (connection) await connection.end();
    }
}

addTrackingColumn();
