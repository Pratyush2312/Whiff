import mongoose from "mongoose";

const ComboSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true
    },

    perfume: {
      type: [String],
      // required:true
    },

    volume: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
    },
    
    slug: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Combo = mongoose.model("Combo", ComboSchema);
