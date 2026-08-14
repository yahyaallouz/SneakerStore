const db = require('./db');

async function checkImageUrls() {
    try {
        const [rows] = await db.execute('SELECT id, name, image_url FROM products LIMIT 5');
        console.log('Product Images:');
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkImageUrls();
