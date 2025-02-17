require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load MongoDB URI from .env
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MongoDB URI is missing! Please check your .env file.");
    process.exit(1); // Stop server if no DB connection string
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit if database connection fails
    });

// User Routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 8081; // Use .env port if available
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
