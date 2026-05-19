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

    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }

    try {
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
        const { name, quantity, expiration_date, category } = req.body;

        if (!name || quantity === undefined || !expiration_date || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // FIXED: Added the 'category' column name and $4 argument marker to the insertion parameters
        const newItem = await pool.query(
            'INSERT INTO public.inventory_item (item_name, quantity, expiration_date, category) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, quantity, expiration_date, category]
        );

        res.status(201).json(newItem.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error saving food item.' });
    }
});

// Fetch all inventory items
router.get('/', async (req, res) => {
    try {
        // FIXED: Standardized selection to read your active text 'category' column value seamlessly
        const items = await pool.query(
            `SELECT item_id AS id,
                    item_name AS name,
                    quantity,
                    expiration_date,
                    category
             FROM public.inventory_item`
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
        res.status(500).json({ message: 'Server error updating item.' });
    }
});

module.exports = router;