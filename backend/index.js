const express = require('express');
const cors = require('cors');
require('dotenv').config(); // MUST be at the top!

// 1. Import your routing modules
const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/items'); 
const volunteersRouter = require('./routes/volunteers');// <-- ADDED: Imports the volunteer controller
const dashboardRouter = require('./routes/dashboard'); // <-- ADDED: Imports the dashboard controller

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const path = require('path');

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Ensure root serves the frontend index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// 2. Mount your Routes
app.use('/auth', authRouter);
app.use('/items', itemsRouter); 
app.use('/volunteers', volunteersRouter); // <-- ADDED: Handles all /volunteers requests from the frontend
app.use('/dashboard', dashboardRouter); // <-- ADDED: Handles all /dashboard requests from the frontend

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});