const express = require('express');
const cors = require('cors');
require('dotenv').config(); // MUST be at the top!

// 1. Import your routing modules
const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/items'); 
const volunteersRouter = require('./routes/volunteers'); // <-- ADDED: Imports the volunteer controller

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 2. Mount your Routes
app.use('/auth', authRouter);
app.use('/items', itemsRouter); 
app.use('/volunteers', volunteersRouter); // <-- ADDED: Handles all /volunteers requests from the frontend

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});