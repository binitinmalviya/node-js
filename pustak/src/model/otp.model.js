const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // expires: 59,
    },
  },
  { timestamps: true }
);

const OtpModel = mongoose.model("otp", OtpSchema);

module.exports = OtpModel;


// user ki user id as userId --- otp table -- user 