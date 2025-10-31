const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: ["active", "inactive"],
    isBlocked: {
        type: Boolean,
        default: false
    },
    isFreezed: {
        type: Boolean,
        default: false
    },
    ipAddress: String
}, { timestamps: true })

const UserModel = mongoose.model('user', UserSchema)

module.exports = { UserModel };

//  task : ['todo,'in-progreess','done']