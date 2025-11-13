const { BookModel } = require("../model/book.model");

exports.addToCart = async (req, res) => {
    try {

        const { bookId, qty } = req.body;

        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found please send valid book id." })
        }
        const bookTotal = qyt * book.price;
        // to be continue



        return res.status(201).json({ message: "Product added into cart." })
    } catch (error) {
        console.error("addToCart", error.message)
        return res.status(500).json({ message: "Internal server error", errMsg: error.message })
    }
}

// delete from cart

exports.deleteProductFromCart = async (req, res) => {
    try {
        return res.status(201).json({ message: "Product delete from cart." })
    } catch (error) {
        console.error("deleteProductFromCart", error.message)
        return res.status(500).json({ message: "Internal server error", errMsg: error.message })
    }
}


// increase qyt 
exports.increaseQYT = async (req, res) => {
    try {
        return res.status(201).json({ message: "increaseQYT." })
    } catch (error) {
        console.error("increaseQYT", error.message)
        return res.status(500).json({ message: "Internal server error", errMsg: error.message })
    }
}


// decrease qyt

exports.decreaseQYT = async (req, res) => {
    try {
        return res.status(201).json({ message: "decreaseQYT." })
    } catch (error) {
        console.error("decreaseQYT", error.message)
        return res.status(500).json({ message: "Internal server error", errMsg: error.message })
    }
}


// get cart of user

exports.getCart = async (req, res) => {
    try {
        return res.status(201).json({ message: "getCart." })
    } catch (error) {
        console.error("getCart", error.message)
        return res.status(500).json({ message: "Internal server error", errMsg: error.message })
    }
}