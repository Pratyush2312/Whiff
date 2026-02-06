import { Combo } from "../models/combo.js";

export const getCombos = async (req, res) => {
  try {
    const combos = await Combo.find().populate("perfumes.perfume");
    res.json(combos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
