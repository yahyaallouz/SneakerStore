const db = require('./db');

async function checkSchema() {
    try {
        const [rows] = await db.execute('DESCRIBE products');
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkSchema();
