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
        required: true,

    },
    isPayment: {
        type: Boolean
    }

}, { timestamps: true });



exports.OrderModel = mongoose.model('order', OrderSchema);