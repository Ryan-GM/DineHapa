const Order = require('../models/Order');

//get all orders
exports.getOrders = async(req,res) =>{
    try{
        const orders = await Order.find()
        .populate('userId')
        .populate('restaurantId')
        res.json(orders);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

//create order
exports.createOrder = async(req,res) =>{
    const order = new Order({
        userId : req.body.userId,
        restaurantId : req.body.restaurantId,
        items : req.body.items,
        totalPrice : req.body.totalPrice,
        status : req.body.status ||'pending',
        paymentMethod : req.body.paymentMethod
    })
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    };
    
//get a single order
exports.getOrderById = async(req,res) => {
    try {
        const order = await Order.findById(req.params.id)
          .populate('userId')
          .populate('restaurantId');
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };

//get order history of a user
exports.getUserOrderHistory = async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.id })
        .populate('restaurantId');
      if (!orders.length) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
//update order status of user
  exports.updateOrderStatus = async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: { status: req.body.status } },
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(updatedOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  //delete specific order
  exports.deleteOrder = async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  