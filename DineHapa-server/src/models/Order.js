const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId:{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items :{
        menuItemId :{
            type : Schema.Types.ObjectId,
            ref : 'MenuItem',
            required : true
        },
        quantity:{
            type: Number,
            required: true,
            min: 1
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status :{
        type: String,
        enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'paypal'],
        default: 'cash'  
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);