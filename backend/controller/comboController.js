import { Combo } from "../models/combo.js";

export const getCombos = async (req, res) => {
  try {
    const combos = await Combo.find();
    res.json(combos);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" });
  }
}

export const getCombosbyslug = async (req, res) => {
  try{
    const { slug } = req.params
    const data = await Combo.findOne({ slug: slug })
    if (!data) {
      return res.status(404).json({ message: "Combo not found" });
    }
    res.json(data)
  }catch(error){
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
