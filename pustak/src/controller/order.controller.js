const { CartModel } = require("../model/cart.model");
const { OrderModel } = require("../model/order.model");

exports.checkout = async (req, res) => {
    try {
        const { cartId, userId } = req.body;

        const cart = await CartModel.findOne({ _id: cartId, userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const orderTotal = cart.item.reduce((sum, i) => sum + i.total, 0);

        const order = await OrderModel.create({
            cartId,
            userId,
            total: orderTotal,
            isPayment: false
        });

        return res.status(201).json({ message: "Order placed", order });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};

exports.getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await OrderModel.find({ userId })
            .populate("cartId")
            .sort({ createdAt: -1 });

        return res.status(200).json({ message: "Orders fetched", data: orders });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findById(id).populate("cartId userId");

        return res.status(200).json({ message: "Order fetched", data: order });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
            .populate("cartId userId")
            .sort({ createdAt: -1 });

        return res.status(200).json({ message: "All orders fetched", data: orders });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isPayment } = req.body;

        const updated = await OrderModel.findByIdAndUpdate(
            id,
            { isPayment },
            { new: true }
        );

        return res.status(200).json({ message: "Payment status updated", data: updated });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await OrderModel.findByIdAndDelete(id);

        return res.status(200).json({ message: "Order deleted", data: deleted });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", errMsg: error.message });
    }
};
