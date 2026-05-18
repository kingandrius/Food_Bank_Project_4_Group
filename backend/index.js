const express = require('express');
const cors = require('cors');
require('dotenv').config(); // MUST be at the top!

const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/items'); // 1. Import your items file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/items', itemsRouter); // 2. MOUNT IT HERE! This prefixes your route with /items

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});