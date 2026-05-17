const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Token verification for logged in users
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

// Create inventory new inventory item
router.post('/addnew', verifyToken, async (req, res) => {
    try {
        const { name, quantity, expiration_date } = req.body

        if (!name || !quantity || !expiration_date) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newItem = await pool.query(
            'INSERT INTO inventory (name, quantity, expiration_date) VALUES ($1, $2, $3) RETURNING *',
            [name, quantity, expiration_date]
        );

        res.status(201).json({ item: newItem.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Get all inventory items
router.get('/all', verifyToken, async (req, res) => {
    try {
        const items = await pool.query('SELECT * FROM inventory');
        res.status(200).json({ items: items.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Update inventory item quantity
router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (quantity === undefined || quantity === null) {
            return res.status(400).json({ message: 'Quantity is required.' });
        }

        const updatedItem = await pool.query(
            'UPDATE inventory SET quantity = $1 WHERE id = $2 RETURNING *',
            [quantity, id]
        );

        if (updatedItem.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        res.status(200).json({ item: updatedItem.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
