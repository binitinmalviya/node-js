const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    item: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
            qty: {
                type: Number,
                min: 1,
                default: 1
            },
            total: {
                type: Number
            }
        }
    ],
    total: {
        type: Number,
        required: true
    }

}, { timestamps: true })

exports.CartModel = mongoose.model('cart', CartSchema);