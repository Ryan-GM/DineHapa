const Menu = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant"); 


// Create new menu
exports.createMenu = async (req, res) => {
    const { restaurantId, items } = req.body;

    // Check if restaurantId and items are provided
    if (!restaurantId || !items) {
        return res.status(400).json({ message: 'Please provide restaurant ID and menu items' });
    }

    try {
        // Verify that the restaurant exists
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Create the new menu
        const newMenu = new Menu({
            restaurant: restaurantId,
            user: req.user._id,
            items
        });

        const savedMenu = await newMenu.save();
        res.status(201).json(savedMenu);
    } catch (error) {
        console.error('Error creating menu:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get menus by restaurant
exports.getMenusByRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const menus = await Menu.find({ restaurant: restaurantId });
        res.status(200).json(menus);
    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update menu
exports.updateMenu = async (req, res) => {
    const { mentId } = req.params;
    const updates = req.body;

    try {
        const updatedMenu = await Menu.findByIdAndUpdate(mentId, updates, { new: true, runValidators: true });
        if (!updatedMenu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json(updatedMenu);
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
