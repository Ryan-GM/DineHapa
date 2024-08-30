const express = require('express');
const adminRoutes = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

//get users
adminRoutes.get('/users', adminController.getAllUsers);
//all restaurants
adminRoutes.get('/restaurants', adminController.getAllRestaurants);
//putting approval in restaurants
adminRoutes.put('/:id/approve', auth, adminController.approveRestaurant);
//getting all orders
adminRoutes.get('/orders', auth, adminController.getAllOrders);

module.exports = adminRoutes;
