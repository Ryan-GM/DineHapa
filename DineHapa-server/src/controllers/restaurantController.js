const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// Fetch all restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        // Retrieve all restaurant documents from the database
        const restaurants = await Restaurant.find();
        
        // Send response with status 200 and the list of restaurants
        res.status(200).json({
            status: "success",
            results: restaurants.length, // Number of restaurants found
            data: {
                restaurants, // List of all restaurants
            },
        });
    } catch (err) {
        // Handle errors, sending a response with status 500
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve restaurants", 
            error: err.message, // Detailed error message
        });
    }
};

// Fetch a single restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        // Retrieve a single restaurant document by ID
        const restaurant = await Restaurant.findById(id);
        
        // If no restaurant is found, send a 404 response
        if (!restaurant) {
            return res.status(404).json({
                status: "fail",
                message: "Restaurant not found", 
            });
        }
        
        // Send response with status 200 and the restaurant data
        res.status(200).json({
            status: "success",
            data: {
                restaurant, // The found restaurant
            },
        });
    } catch (err) {
        // Handle errors, sending a response with status 500
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve restaurant", 
            error: err.message, 
        });
    }
};

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
    try {
        // Create a new restaurant document using the request body
        const newRestaurant = await Restaurant.create(req.body);
        
        // Send response with status 201 and the created restaurant
        res.status(201).json({
            status: "success",
            data: {
                restaurant: newRestaurant, // The created restaurant
            },
        });
    } catch (err) {
        // Handle validation or other errors, sending a response with status 400
        res.status(400).json({
            status: "error",
            message: "Failed to create restaurant", 
            error: err.message, 
        });
    }
};

// Update an existing restaurant
exports.updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        // Update the restaurant document by ID
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run validation on the updated document
        });
        
        // If no restaurant is found, send a 404 response
        if (!updatedRestaurant) {
            return res.status(404).json({
                status: "fail",
                message: "Restaurant not found", 
            });
        }
        
        // Send response with status 200 and the updated restaurant data
        res.status(200).json({
            status: "success",
            data: {
                restaurant: updatedRestaurant, // The updated restaurant
            },
        });
    } catch (err) {
        // Handle errors, sending a response with status 500
        res.status(500).json({
            status: "error",
            message: "Failed to update restaurant", 
            error: err.message, 
        });
    }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        // Delete the restaurant document by ID
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        
        // If no restaurant is found, send a 404 response
        if (!deletedRestaurant) {
            return res.status(404).json({
                status: "fail",
                message: "Restaurant not found",
            });
        }
        
        // Send response with status 200 and the deleted restaurant data
        res.status(200).json({
            status: "success",
            data: {
                restaurant: deletedRestaurant, // The deleted restaurant
            },
        });
    } catch (err) {
        // Handle errors, sending a response with status 500
        res.status(500).json({
            status: "error",
            message: "Failed to delete restaurant", 
            error: err.message, 
        });
    }
};

// Fetch nearby restaurants based on location
// exports.getNearbyRestaurants = async (req, res) => {
//     try {
//         const { latitude, longitude } = req.params; // Extract latitude and longitude from request parameters
        
//         // Find nearby restaurants using geospatial query
//         const nearbyRestaurants = await Restaurant.find({
//             location: {
//                 $near: {
//                     $geometry: {
//                         type: "Point",
//                         coordinates: [parseFloat(longitude), parseFloat(latitude)], // Ensure coordinates are numbers
//                     },
//                 },
//             },
//         });
        
//         // Send response with status 200 and the list of nearby restaurants
//         res.status(200).json({
//             status: "success",
//             results: nearbyRestaurants.length, // Number of nearby restaurants found
//             data: {
//                 restaurants: nearbyRestaurants, // List of nearby restaurants
//             },
//         });
//     } catch (err) {
//         // Handle errors, sending a response with status 500
//         res.status(500).json({
//             status: "error",
//             message: "Failed to retrieve nearby restaurants", 
//             error: err.message, 
//         });
//     }
// };
