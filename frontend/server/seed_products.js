const db = require('./db');
const fs = require('fs');
const path = require('path');

const PRODUCTS = [
    {
        name: 'Air Force 1',
        brand: 'Nike',
        price: 110,
        category: 'men',
        imageFilename: 'nike_af1.jpg',
        description: 'A classic white leather sneaker with a clean design. Timeless style.',
        sizes: [7, 8, 9, 10, 11, 12]
    },
    {
        name: 'RS-X',
        brand: 'Puma',
        price: 120,
        category: 'men',
        imageFilename: 'puma.png', // Using puma.png as placeholder from original file
        description: 'A modern, chunky sneaker with a bold black, white, and red colorway.',
        sizes: [8, 9, 10, 11, 12]
    },
    {
        name: 'Stan Smith',
        brand: 'Adidas',
        price: 100,
        category: 'men',
        imageFilename: 'adidas_stan_smith.jpg',
        description: 'A timeless tennis shoe in white leather with green accents.',
        sizes: [7, 8, 9, 10, 11]
    },
    {
        name: 'Air Max 270',
        brand: 'Nike',
        price: 150,
        category: 'women',
        imageFilename: 'nike_air_max_270.jpg',
        description: 'A popular lifestyle shoe in a feminine pastel pink color.',
        sizes: [5, 6, 7, 8, 9]
    },
    {
        name: 'Cali',
        brand: 'Puma',
        price: 90,
        category: 'women',
        imageFilename: 'puma_cali.jpg',
        description: 'A trendy platform sneaker in white leather with elegant gold details.',
        sizes: [5, 6, 7, 8, 9]
    },
    {
        name: 'Ultraboost',
        brand: 'Adidas',
        price: 180,
        category: 'women',
        imageFilename: 'adidas.png', // Placeholder
        description: 'A performance running shoe in a stylish light blue and white knit material.',
        sizes: [5, 6, 7, 8, 9]
    },
    {
        name: 'Revolution 5',
        brand: 'Nike',
        price: 55,
        category: 'kids',
        imageFilename: 'nike.png', // Placeholder
        description: 'A colorful and practical shoe for kids with easy-to-use Velcro straps.',
        sizes: [1, 2, 3, 4, 5]
    },
    {
        name: 'Smash v2',
        brand: 'Puma',
        price: 45,
        category: 'kids',
        imageFilename: 'puma_panda.jpg',
        description: 'A fun black sneaker featuring an adorable panda graphic on the side.',
        sizes: [1, 2, 3, 4]
    },
    {
        name: 'Superstar Kids',
        brand: 'Adidas',
        price: 50,
        category: 'kids',
        imageFilename: 'adidas.png', // Placeholder
        description: 'A classic kids\' shoe with the iconic shell toe and iridescent three stripes.',
        sizes: [0, 1, 2]
    },
];

const SOURCE_DIR = path.join(__dirname, '../src/assets/images');
const TARGET_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR);
}

async function seed() {
    console.log('Starting seed...');

    // Clear existing products to avoid duplicates? Or just append?
    try {
        await db.execute('SET FOREIGN_KEY_CHECKS = 0');
        await db.execute('TRUNCATE TABLE order_items');
        await db.execute('TRUNCATE TABLE orders');
        await db.execute('TRUNCATE TABLE products');
        await db.execute('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Tables cleared.');

        for (const p of PRODUCTS) {
            // Copy image
            const sourcePath = path.join(SOURCE_DIR, p.imageFilename);
            const targetPath = path.join(TARGET_DIR, p.imageFilename);
            let imageUrl = null;

            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, targetPath);
                // console.log(`Copied ${p.imageFilename}`);
                imageUrl = `/uploads/${p.imageFilename}`;
            } else {
                console.warn(`Image not found: ${sourcePath}`);
            }

            await db.execute(
                'INSERT INTO products (name, brand, price, category, description, image_url, sizes) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [p.name, p.brand, p.price, p.category, p.description, imageUrl, JSON.stringify(p.sizes)]
            );
            console.log(`Inserted ${p.name}`);
        }
        console.log('Seed completed successfully.');
    } catch (err) {
        console.error('Seed failed:', err);
    } finally {
        process.exit();
    }
}

seed();
