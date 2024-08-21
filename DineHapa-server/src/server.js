const mongoose = require('mongoose');

require('dotenv').config();

const app = require('./app');


// Database connection
const connectDB = require('./config/database');
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
