const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        name:{ type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        available: { type: Boolean, required: true }
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
}, { timestamps: true });

const Menu = mongoose.model('MenuItem', menuItemSchema);

module.exports = Menu;