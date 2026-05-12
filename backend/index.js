const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json()); // Processes JSON files

app.use('/auth', require('./routes/auth'))

app.get('/', (req, res) => {
    res.json('The quick brown fox jumps over the lazy dog');
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});