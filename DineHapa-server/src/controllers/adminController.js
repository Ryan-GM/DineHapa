const Users = require('../models/User');
const Restaurants = require('../models/Restaurant');
const Orders = require('../models/Order');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
} 

exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurants.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//approving restaurants
exports.approveRestaurant = async (req, res) => {
    try {
        //finding restaurant by ID
        const restaurant = await Restaurants.findById(req.params.id);
        //...if it isnt found
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        //if found... sets approved to true
        restaurant.approved = true;
        //saves updated restaurant to the database
        await restaurant.save();
        res.json(restaurant);
    } catch (err) {
        //if any error occurs during the process
        res.status(500).json({ message: err.message });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
