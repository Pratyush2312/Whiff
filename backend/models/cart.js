import mongoose from "mongoose";
const { Schema } = mongoose;

const CartSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true
        },  
        item: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "itemType"
        },
        itemType: {
            type: String,
            required: true,
            enum: ["Perfume", "Combo"]
        },


        quantity: {
            type: Number,
            default: 1,
        },

        volume: {   
            type: String,
            enum: ["10ml", "30ml"],
            default: null,
        },

        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);


          



export const Cart = mongoose.model("Cart", CartSchema);
