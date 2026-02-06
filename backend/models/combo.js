import mongoose from "mongoose";

const ComboSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    perfumes: [
      {
        perfume: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Perfume",
          required: true,
        },
        volume: {
          type: String, // "10 ML" or "30 ML"
          required: true,
        },
      },
    ],

    price: {
      type: Number, // 399 / 599
      required: true,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Combo = mongoose.model("Combo", ComboSchema);
