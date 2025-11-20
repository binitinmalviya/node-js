const express = require('express');
const { verifyToken } = require('../middleware/token');
const cartController = require('../controller/cart.controller');

const cartRoutes = express.Router();

cartRoutes.post('/', verifyToken, cartController.addToCart);
cartRoutes.get('/', verifyToken, cartController.getCart);
cartRoutes.delete('/', verifyToken, cartController.deleteProductFromCart);
cartRoutes.post('/increase-qyt', verifyToken, cartController.increaseQYT);
cartRoutes.post('/decrease-qyt', verifyToken, cartController.decreaseQYT);
cartRoutes.get('/user/:userId', verifyToken, cartController.getUserWithCart);

module.exports = cartRoutes;
