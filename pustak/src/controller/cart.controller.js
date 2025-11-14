const { BookModel } = require("../model/book.model");
const { CartModel } = require("../model/cart.model");


/*
 find the book in book model validation
 cal total of qty book
 check cart is created or not if created add the book into the cart in items array
 check all ready added into the cart
*/
exports.addToCart = async (req, res) => {
    try {
        const { bookId, qty, userId } = req.body;
        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found please send valid book id." })
        }
        const bookTotal = qty * book.price;
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            const newCart = await CartModel.create({
                userId,
                item: [{
                    bookId, qty, total: bookTotal
                }],
                total: bookTotal
            })
            return res.status(201).json({ status: true, statusCode: 201, message: "Cart is created", cart: newCart })
        } else {
            const exitingItemIndex = cart.item.findIndex((i) => { i.bookId.toString() === bookId });
            console.log("exitingItemIndex", exitingItemIndex)
            if (exitingItemIndex > -1) {
                cart.item[exitingItemIndex].qyt += qyt;
                cart.item[exitingItemIndex].total += bookTotal;
            } else
                cart.item.push({ bookId, qty, total: bookTotal })

            cart.total = cart.item.reduce((sum, i) => sum + i.total, 0);
            await cart.save();
            return res.status(201).json({ status: true, statusCode: 201, message: "Product added into the cart.", cart: cart })
        }

    } catch (error) {
        console.error("addToCart", error)
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