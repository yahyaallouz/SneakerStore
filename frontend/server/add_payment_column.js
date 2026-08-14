const db = require('./db');

async function migrate() {
    console.log('Starting migration: Adding payment_method to orders table...');
    try {
        await db.execute("ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50) DEFAULT 'Card'");
        console.log('Migration successful: Column added.');
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log('Column payment_method already exists. Skipping.');
        } else {
            console.error('Migration failed:', error);
        }
    }
    process.exit();
}

migrate();
