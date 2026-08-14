const db = require('./db');

async function checkProducts() {
    try {
        const [rows] = await db.execute('SELECT id, name, image, image_url FROM products LIMIT 5');
        console.log('Sample Products:');
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkProducts();
