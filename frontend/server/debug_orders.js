const db = require('./db');

async function checkOrders() {
    try {
        const [rows] = await db.execute('SELECT id, tracking_number, total, created_at FROM orders ORDER BY created_at DESC LIMIT 5');
        console.log('Latest 5 orders:');
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkOrders();
