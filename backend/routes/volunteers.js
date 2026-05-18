const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Security Token Verification Middleware
const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided.' });

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

// GET all users who are Volunteers (role_id = 2)
router.get('/', verifyToken, async (req, res) => {
    try {
        const queryText = `
            SELECT u.id, u.name, u.email, r.role_name 
            FROM users u
            JOIN role r ON u.role_id = r.role_id
            WHERE u.role_id = 2
        `;
        const volunteers = await pool.query(queryText);
        res.status(200).json(volunteers.rows);
    } catch (err) {
        console.error("Backend Error:", err);
        res.status(500).json({ message: 'Server error fetching volunteers.' });
    }
});

module.exports = router;