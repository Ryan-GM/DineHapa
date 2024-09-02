const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
    })
);

// User routes
app.use('/api/users', userRoutes);
// Restaurant routes
app.use('/api/restaurants', restaurantRoutes);
// Order routes
app.use('/api/orders', orderRoutes);
// Menu routes
app.use('/api/menus', menuRoutes);
// review routes
app.use('/api/reviews', reviewRoutes);
// Admin routes
app.use('/api/admin', adminRoutes);


module.exports = app;
