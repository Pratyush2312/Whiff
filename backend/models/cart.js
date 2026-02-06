import mongoose from "mongoose";
const { Schema } = mongoose;

const CartSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // 🔹 perfume item
        perfume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Perfume",
            default: null,
        },

        // 🔹 combo item
        combo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Combo",
            default: null,
        },

        quantity: {
            type: Number,
            default: 1,
        },

        volume: {
            type: String,
            enum: ["10 ML", "30 ML"],
            default: null,
        },

        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);


CartSchema.pre("validate", function () {
    if (!this.perfume && !this.combo) {
        throw new Error("Either perfume or combo is required");
    }
});


export const Cart = mongoose.model("Cart", CartSchema);
