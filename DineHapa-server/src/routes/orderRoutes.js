const express = require('express');
const router = express.Router(); 

const orderController = require('../controllers/orderController');

router.get('/', orderController.getOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);
router.get('/users/:id/orders', orderController.getUserOrderHistory);


module.exports = router;
