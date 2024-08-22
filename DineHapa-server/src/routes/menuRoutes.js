const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Create a new menu
router.post('/', menuController.createMenu);

// Get all menus for a specific restaurant
router.get('/:restaurantId', menuController.getMenusByRestaurant);

// Update a menu
router.put('/:menuId', menuController.updateMenu);

module.exports = router;
