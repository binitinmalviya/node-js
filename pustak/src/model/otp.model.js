const { default: mongoose } = require("mongoose");

const OtpSchema = new mongoose.Schema({
    otp: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: '30s'
    }
}, { timestamps: true })

// 1729371238 --- 12-09-2023 (date + time + sc)
const OtpModel = mongoose.model('otp', OtpSchema)

//  PK --- FK --- ObjectId

module.exports = OtpModel;