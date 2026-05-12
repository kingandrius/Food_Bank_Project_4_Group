const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// POST backend/auth/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // 1. Check if user already exists (replace with your DB query)
        const existing = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );
        if (existing.rows.length > 0) {
            return res.status(409).json({ message: 'Email already in use.' });
        };

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Save user to DB (replace with your DB query)
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING id, name, role_id',
            [name, email, hashedPassword, 2]
        );

        res.status(201).json({ user: newUser.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// POST backend/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // 1. Find user in DB (replace with your DB query)
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // 3. Generate JWT token
        const payload = { id: user.id, username: user.name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful!', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;