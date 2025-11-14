const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    item: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'book',
            },
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
    // overall total of cart
    total: {
        type: Number,
        required: true
    }

}, { timestamps: true })

exports.CartModel = mongoose.model('cart', CartSchema);


// user -- cart --  (items) products

// CART TABLE
//  userId   , items  , totals
//   1       , [{p1},{p2},{p3},{p3}], 34000
//   2       , [{p1}], 4000


// USER TABLE
// userId (_id) , username , gender , isBlock,
// 1            , nitin , male , false
// 2            , Dipanshu , male , false


// User -- cart --- order -- payment