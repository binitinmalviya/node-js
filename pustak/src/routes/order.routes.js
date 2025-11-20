const express = require('express');
const {
    checkout,
    getOrdersByUser,
    getOrderById,
    getAllOrders,
    updatePaymentStatus,
    deleteOrder
} = require('../controller/order.controller');

const orderRoutes = express.Router();

orderRoutes.post('/', checkout);
orderRoutes.get('/', getAllOrders);
orderRoutes.get('/user/:userId', getOrdersByUser);
orderRoutes.get('/:id', getOrderById);
orderRoutes.put('/:id/payment', updatePaymentStatus);
orderRoutes.delete('/:id', deleteOrder);

module.exports = orderRoutes;
