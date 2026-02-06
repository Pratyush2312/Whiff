import mongoose from "mongoose";
const { Schema } = mongoose;

const PerfumeSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    front: { type: String },
    category: {
        type: String,
        enum: ["Men", "Women", "Unisex"],
        required: true
    },

    volume: { type: String },
    fragranceType: { type: String },

    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    slug: { type: String, required: true, unique: true },
    byWhiff: { type: String, required: true },
    back: { type: String },
    TenML: { type: String },
    TenMLfront: { type: String },
    TenMLback: { type: String },
    isActive: { type: Boolean, default: true }
}, {timestamps:true})

export const Perfume = mongoose.model("Perfume", PerfumeSchema)