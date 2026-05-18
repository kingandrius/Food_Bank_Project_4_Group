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
        // Step 1: Select the base ID, the composite data structure, and role_id
        const queryText = `
            SELECT id, users, role_id 
            FROM users 
            WHERE role_id = 2
        `;
        const result = await pool.query(queryText);
        
        // Step 2: Map over the rows to safely parse out the text fields
        const volunteers = result.rows.map(row => {
            let parsedName = 'Unknown Volunteer';
            let parsedEmail = 'No Email Provided';

            if (row.users) {
                // If the field is a string representation of a record tuple: (5,"Blah Blahblah",blah@blah.com,...)
                if (typeof row.users === 'string') {
                    // Split by comma values while stripping surrounding parentheses and quotes
                    const cleanString = row.users.replace(/[()"]/g, '');
                    const parts = cleanString.split(',');
                    
                    if (parts.length >= 3) {
                        parsedName = parts[1].trim();
                        parsedEmail = parts[2].trim();
                    }
                } 
                // If your driver automatically converts it to an object/array
                else if (typeof row.users === 'object') {
                    parsedName = row.users.name || row.users[1] || parsedName;
                    parsedEmail = row.users.email || row.users[2] || parsedEmail;
                }
            }

            // Return structural properties matching exactly what your frontend expects
            return {
                id: row.id,
                name: parsedName,
                email: parsedEmail,
                role_name: 'Volunteer'
            };
        });

        res.status(200).json(volunteers);
    } catch (err) {
        console.error("Backend Error Parsing Volunteer Schema:", err);
        res.status(500).json({ message: 'Server error fetching volunteers.' });
    }
});

module.exports = router;