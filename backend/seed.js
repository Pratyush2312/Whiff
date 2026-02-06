import mongoose from "mongoose";
import dotenv from "dotenv"

import {Perfume} from "./models/perfume.js";
dotenv.config()
const MONGO_URL=process.env.MONGO_URL
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ DB connected"))
  .catch(err => console.error(err));

const seedPerfumes = async () => {
  try {
    await Perfume.deleteMany({});
    console.log("🧹 Old perfumes deleted");

    await Perfume.insertMany([
      {
        id: 1,
        name: "Dark Desire",
        brand: "Whiff",
        price: 399,
        description: "A bold and intense fragrance with deep woody and spicy notes.",
        byWhiff: "Crafted to express confidence and mystery.",
        image:"uploads/DarkDesire10ML-front.png",
        front: "uploads/DarkDesire30ML-front.png",
        back: "uploads/DarkDesire30ML-back.png",
        TenMLfront: "uploads/DarkDesire10ML-front.png",
        TenMLback: "uploads/DarkDesire10ML-back.png",
        category: "Men",
        volume: "30 ML",
        fragranceType: "Woody Spicy",
        stock: 40,
        rating: 4.6,
        numReviews: 14,
        slug: "dark-desire",
        isActive: true
      },
      {
        id: 2,
        name: "Earthen Muse",
        brand: "Whiff",
        price: 399,
        description: "An earthy and calming fragrance inspired by nature.",
        byWhiff: "Designed to connect you with nature.",
        image: "uploads/EarthenMuse10ML-front.png",
        front: "uploads/EarthenMuse30ML-front.png",
        back: "uploads/EarthenMuse30ML-back.png",
        TenMLfront: "uploads/EarthenMuse10ML-front.png",
        TenMLback: "uploads/EarthenMuse10ML-back.png",
        category: "Unisex",
        volume: "30 ML",
        fragranceType: "Earthy Woody",
        stock: 35,
        rating: 4.4,
        numReviews: 10,
        slug: "earthen-muse",
        isActive: true
      },
      {
        id: 3,
        name: "Petal Whispers",
        brand: "Whiff",
        price: 399,
        description: "A soft floral fragrance with delicate sweetness.",
        byWhiff: "Created for graceful moments.",
        image: "uploads/PetalWhispers10ML-front.png",
        front: "uploads/PetalWhispers30ML-front.png",
        back: "uploads/PetalWhispers30ML-back.png",
        TenMLfront: "uploads/PetalWhispers10ML-front.png",
        TenMLback: "uploads/PetalWhispers10ML-back.png",
        category: "Women",
        volume: "30 ML",
        fragranceType: "Floral Soft",
        stock: 45,
        rating: 4.5,
        numReviews: 12,
        slug: "petal-whispers",
        isActive: true
      },
      {
        id: 4,
        name: "Ocean Pulse",
        brand: "Whiff",
        price: 399,
        description: "A refreshing aquatic fragrance inspired by ocean waves.",
        byWhiff: "Made for freshness and freedom.",
        image: "uploads/PetalWhispers10ML-front.png",
        front: "uploads/PetalWhispers30ML-front.png",
        back: "uploads/PetalWhispers30ML-back.png",
        TenMLfront: "uploads/PetalWhispers10ML-front.png",
        TenMLback: "uploads/PetalWhispers10ML-back.png",
        category: "Men",
        volume: "30 ML",
        fragranceType: "Fresh Aquatic",
        stock: 50,
        rating: 4.3,
        numReviews: 9,
        slug: "ocean-pulse",
        isActive: true
      },
      {
        id: 5,
        name: "Velvet Strength",
        brand: "Whiff",
        price: 399,
        description: "A smooth yet powerful musky fragrance.",
        byWhiff: "Strength wrapped in elegance.",
        image: "uploads/VelvetStrength10ML-front.png",
        front: "uploads/VelvetStrength30ML-front.png",
        back: "uploads/VelvetStrength30ML-back.png",
        TenMLfront: "uploads/VelvetStrength10ML-front.png",
        TenMLback: "uploads/VelvetStrength10ML-back.png",
        category: "Unisex",
        volume: "30 ML",
        fragranceType: "Musky Woody",
        stock: 30,
        rating: 4.7,
        numReviews: 16,
        slug: "velvet-strength",
        isActive: true
      },
      {
        id: 6,
        name: "Vanilla Veil",
        brand: "Whiff",
        price: 399,
        description: "A warm and comforting vanilla fragrance.",
        byWhiff: "Soft, cozy, and inviting.",
        image: "uploads/VanillaVeil10ML-front.png",
        front: "uploads/VanillaVeil30ML-front.png",
        back: "uploads/VanillaVeil30ML-back.png",
        TenMLfront: "uploads/VanillaVeil10ML-front.png",
        TenMLback: "uploads/VanillaVeil10ML-back.png",
        category: "Women",
        volume: "30 ML",
        fragranceType: "Sweet Vanilla",
        stock: 60,
        rating: 4.8,
        numReviews: 18,
        slug: "vanilla-veil",
        isActive: true
      }
    ]);

    console.log("🌸 6 active perfumes seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedPerfumes();
