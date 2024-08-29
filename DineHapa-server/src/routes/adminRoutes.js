const express = require('express');
const adminRoutes = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

//get users
adminRoutes.get('/', auth, adminController.getAllUsers);
//all restaurants
adminRoutes.get('/', adminController.getAllUsers);
//putting approval in restaurants
adminRoutes.put('/:id/approve', auth, adminController.approveRestaurant);
//getting all orders
adminRoutes.get('/', auth, adminController.getAllOrders);

module.exports = adminRoutes;
