const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

// Image Upload Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Get All Products
router.get('/', async (req, res) => {
    try {
        const [products] = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add Product (Admin Only - Middleware to be added)
router.post('/', upload.single('image'), async (req, res) => {
    const { name, brand, price, category, description, sizes } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const [result] = await db.execute(
            'INSERT INTO products (name, brand, price, category, description, image_url, sizes) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                name || null,
                brand || null,
                price || 0,
                category || 'men',
                description || '',
                imageUrl,
                sizes || '[]'
            ]
        );
        res.status(201).json({ id: result.insertId, ...req.body, imageUrl });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: error.message });
    }
});

// Update Product
router.put('/:id', upload.single('image'), async (req, res) => {
    const { name, brand, price, category, description, sizes } = req.body;
    let imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Construct query dynamically based on whether image is updated
    let query = 'UPDATE products SET name=?, brand=?, price=?, category=?, description=?, sizes=?';
    let params = [
        name || null,
        brand || null,
        price || 0,
        category || 'men',
        description || '',
        typeof sizes === 'object' ? JSON.stringify(sizes) : (sizes || '[]')
    ];

    if (imageUrl) {
        query += ', image_url=?';
        params.push(imageUrl);
    }

    query += ' WHERE id=?';
    params.push(req.params.id);

    try {
        await db.execute(query, params);
        res.json({ message: 'Product updated', imageUrl });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: error.message });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
