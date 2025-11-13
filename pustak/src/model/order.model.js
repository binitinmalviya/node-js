const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    total: {
        type: Number,
        required: true
    }

}, { timestamps: true });

exports.OrderModel = mongoose.model('order', OrderSchema);