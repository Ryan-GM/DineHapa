const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/restaurantController");

// Route to get all restaurants
router.get("/", RestaurantController.getAllRestaurants);

// Route to get a restaurant by ID
router.get("/:id", RestaurantController.getRestaurantById);

// Route to create a new restaurant
router.post("/", RestaurantController.createRestaurant);

// Route to update a restaurant
router.put("/:id", RestaurantController.updateRestaurant);

// Route to delete a restaurant
router.delete("/:id", RestaurantController.deleteRestaurant);

// // Route to get nearby restaurants
// router.get("/nearby/:latitude/:longitude", RestaurantController.getNearbyRestaurants);

module.exports = router;
