const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Token verification for logged in users
const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    // FIX: If the token contains "Bearer ", strip it away to get the raw string
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }

    try {
        // Uses fallback secret key signature string if your .env didn't load early enough
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretfallback');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

// Create new inventory item
router.post('/addnew', verifyToken, async (req, res) => {
    try {
        const { name, quantity, expiration_date } = req.body;

        if (!name || quantity === undefined || !expiration_date) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newItem = await pool.query(
            'INSERT INTO inventory_item (item_name, quantity, expiration_date) VALUES ($1, $2, $3) RETURNING item_id AS id, item_name AS name, quantity, expiration_date',
            [name, quantity, expiration_date]
        );

        res.status(201).json(newItem.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Get all inventory items
// FIXED: Uses 'AS' aliases to match database columns (item_name, item_id) to frontend keys (name, id)
router.get('/', verifyToken, async (req, res) => {
    try {
        const items = await pool.query(
            'SELECT item_id AS id, item_name AS name, quantity, expiration_date FROM inventory_item'
        );
        res.status(200).json(items.rows);
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
            'UPDATE inventory_item SET quantity = $1 WHERE item_id = $2 RETURNING item_id AS id, item_name AS name, quantity, expiration_date',
            [quantity, id]
        );

        if (updatedItem.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        res.status(200).json(updatedItem.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;