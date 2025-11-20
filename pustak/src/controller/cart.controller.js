const { BookModel } = require("../model/book.model");
const { CartModel } = require("../model/cart.model");

exports.addToCart = async (req, res) => {
    try {
        const { bookId, qty, userId } = req.body;
        const book = await BookModel.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found. Please send valid book id." });

        const bookTotal = qty * book.price;
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            const newCart = await CartModel.create({
                userId,
                item: [{ bookId, qty, total: bookTotal }],
                total: bookTotal
            });

            return res.status(201).json({
                status: true,
                statusCode: 201,
                message: "Cart created",
                cart: newCart
            });
        }

        const existingItemIndex = cart.item.findIndex(i => i.bookId.toString() === bookId);
        if (existingItemIndex > -1) {
            return res.status(200).json({
                status: false,
                statusCode: 200,
                message: "This book is already in cart."
            });
        }

        cart.item.push({ bookId, qty, total: bookTotal });
        cart.total = cart.item.reduce((sum, i) => sum + i.total, 0);
        await cart.save();

        return res.status(201).json({
            status: true,
            statusCode: 201,
            message: "Product added into the cart.",
            cart
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};

exports.deleteProductFromCart = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const cart = await CartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.item = cart.item.filter(i => i.bookId.toString() !== bookId);
        cart.total = cart.item.reduce((sum, i) => sum + i.total, 0);
        await cart.save();

        return res.status(200).json({ message: "Product deleted from cart", cart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};

exports.increaseQYT = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const cart = await CartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.item.find(i => i.bookId.toString() === bookId);
        if (!item) return res.status(404).json({ message: "Item not found in cart" });

        item.qty += 1;
        const book = await BookModel.findById(bookId);
        item.total = item.qty * book.price;

        cart.total = cart.item.reduce((sum, i) => sum + i.total, 0);
        await cart.save();

        return res.status(200).json({ message: "Quantity increased", cart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};

exports.decreaseQYT = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const cart = await CartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.item.find(i => i.bookId.toString() === bookId);
        if (!item) return res.status(404).json({ message: "Item not found in cart" });

        if (item.qty <= 1) {
            cart.item = cart.item.filter(i => i.bookId.toString() !== bookId);
        } else {
            item.qty -= 1;
            const book = await BookModel.findById(bookId);
            item.total = item.qty * book.price;
        }

        cart.total = cart.item.reduce((sum, i) => sum + i.total, 0);
        await cart.save();

        return res.status(200).json({ message: "Quantity decreased", cart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await CartModel.findOne({ userId })
            .populate("item.bookId", "title price author");

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        return res.status(200).json({ message: "User cart fetched", cart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};

exports.getUserWithCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId).select("-password");
        const cart = await CartModel.findOne({ userId })
            .populate("item.bookId", "title price author");

        return res.status(200).json({ user, cart });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};
