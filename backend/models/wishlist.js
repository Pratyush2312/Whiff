import mongoose from "mongoose"

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    perfume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Perfume",
      required: true
    }
  },
  { timestamps: true }
)


wishlistSchema.index({ user: 1, perfume: 1 }, { unique: true })

export const Wishlist= mongoose.model("Wishlist", wishlistSchema)
