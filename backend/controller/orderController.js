import { Order } from "../models/order.js";

export const getOrders = async (req, res) => {
    try {
        const userId = req.user;

        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 });
        const length =orders.length;
        res.json({
            status: "success",
            orders,
            length
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error" });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user;

        const order = await Order.findOne({
            _id: orderId,
            user: userId   
        });
        if (!order) {
            return res.status(404).json({
                status: "error",
                message: "Order not found"
            });
        }

        res.json({
            status: "success",
            order
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error" });
    }
};