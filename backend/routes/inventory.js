const express = require('express');
const router = express.Router();
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

module.exports = router;
