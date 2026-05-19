const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Security Token Verification Middleware
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

// GET all users who are Volunteers (role_id = 2)
router.get('/', verifyToken, async (req, res) => {
    try {
        // Simple, direct query assuming standard columns in your 'users' table
        const queryText = `
            SELECT id, name, email 
            FROM users 
            WHERE role_id = 2
        `;
        
        const result = await pool.query(queryText);
        
        // Map rows to the structure the frontend expects
        const volunteers = result.rows.map(row => ({
            id: row.id,
            name: row.name || 'Unknown Volunteer',
            email: row.email || 'No Email Provided',
            role_name: 'Volunteer'
        }));

        res.status(200).json(volunteers);
    } catch (err) {
        console.error("Backend Error fetching volunteers:", err);
        res.status(500).json({ message: 'Server error fetching volunteers.' });
    }
});

module.exports = router;