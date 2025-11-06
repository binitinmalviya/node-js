const { default: mongoose } = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
        publishingDate: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
        isSoldOut: {
            type: Boolean,
            default: false,
        },
        isTrending: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

const BookModel = mongoose.model("book", BookSchema);

module.exports = { BookModel };
