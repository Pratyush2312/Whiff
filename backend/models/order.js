import mongoose, { mongo } from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [
        {
            item: String,
            name: String,
            quantity: Number,
            price: Number,
            volume: String,
        },
    ],
    totalAmount: Number,
    paymentId: String,
    orderId: String,
    paymentStatus: String,
}, { timestamps: true });

export const Order = mongoose.model("Order", OrderSchema)