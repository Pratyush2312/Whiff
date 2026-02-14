import mongoose from "mongoose";
import { Combo } from "./models/combo.js";

mongoose.connect("mongodb+srv://whiffperfumeco_db_user:PFUktckRPwVRA8TS@whiff.8cfx0ci.mongodb.net/?appName=Whiff")
  .then(console.log("DB Connected"))
  .catch(err => console.error(err))

const combos = [
  {
    name: "The Mood Spectrum Trio",
    desc: "A complete fragrance wardrobe featuring fresh aquatic clarity, soft floral elegance, and bold magnetic depth. Designed to move with you from day to night effortlessly.",
    perfume: ["Petal Whispers", "Ocean Pulse", "Velvet Strength"],
    volume: "10ML",
    price: 399
  },
  {
    name: "The After Hours Collection",
    desc: "A warm and indulgent trio blending sensual intensity, earthy sophistication, and creamy sweetness. Perfect for evenings and unforgettable impressions.",
    perfume: ["Dark Desire", "Earthen Muse", "Vanilla Veil"],
    volume: "10ML Each",
    price: 399
  },
  {
    name: "The Breeze & Bloom Duo",
    desc: "A refreshing harmony of aquatic freshness and delicate floral softness. Ideal for daily wear and effortless elegance.",
    perfume: ["Petal Whispers", "Ocean Pulse"],
    volume: "30ML Each",
    price: 599
  },
  {
    name: "The Sweet Seduction Duo",
    desc: "A bold yet smooth pairing combining deep mystery with creamy vanilla warmth. Crafted for evenings and special occasions.",
    perfume: ["Dark Desire", "Vanilla Veil"],
    volume: "30ML Each",
    price: 599
  },
  {
    name: "The Grounded Power Duo",
    desc: "A strong and sophisticated blend of commanding depth and earthy richness. Designed for confident and refined personalities.",
    perfume: ["Velvet Strength", "Earthen Muse"],
    volume: "30ML Each",
    price: 599
  }
];

async function insertCombos() {
  try {
    await Combo.insertMany(combos);
    console.log("Combos inserted successfully 🚀");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
}

insertCombos();
