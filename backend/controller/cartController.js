import { Cart } from "../models/cart.js";
import { Combo } from "../models/combo.js";
/* ================= ADD TO CART ================= */

export const addToCart = async (req, res) => {
    try {
        const userId = req.user;
        let { perfumeId, volume } = req.body;

        if (!userId) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
        }

        if (!volume) {
            volume = "10 ML";
        }

        const priceByVolume = {
            "10 ML": 199,
            "30 ML": 299,
        };

        const basePrice = priceByVolume[volume];

        if (!basePrice) {
            return res.status(400).json({
                status: "error",
                message: "Invalid volume selected",
            });
        }

        const existing = await Cart.findOne({
            user: userId,
            perfume: perfumeId,
            volume: volume,
        });

        if (existing) {
            existing.quantity += 1;
            await existing.save();

            return res.json({
                status: "updated",
                message: "Quantity increased",
            });
        }

        await Cart.create({
            user: userId,
            perfume: perfumeId,
            volume: volume,
            price: basePrice, // 🔥 ONLY BASE PRICE
            quantity: 1,
        });

        return res.status(201).json({
            status: "added",
            message: "Added to cart",
        });

    } catch (err) {
        console.error("ADD TO CART ERROR:", err);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

/* ================= GET CART ================= */

export const getCart = async (req, res) => {
    try {
        const userId = req.user;

        const cartItems = await Cart.find({ user: userId })
            .populate("perfume")
            .populate({
                path: "combo",
                populate: {
                    path: "perfumes.perfume"
                }
            });

        return res.json({
            status: "success",
            cart: cartItems
        });

    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};


/* ================= REMOVE FROM CART ================= */

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user;
        const { cartId } = req.params;

        await Cart.findOneAndDelete({
            user: userId,
            _id: cartId,
        });

        return res.json({
            status: "success",
            message: "Removed from cart",
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Server error",
        });
    }
};

/* ================= UPDATE CART (QTY +/-) ================= */

export const updateCart = async (req, res) => {
    try {
        const userId = req.user;
        const { perfumeId, volume, action } = req.body;

        const item = await Cart.findOne({
            user: userId,
            perfume: perfumeId,
            volume: volume,
        });

        if (!item) {
            return res.status(404).json({
                status: "error",
                message: "Item not found",
            });
        }

        if (action === "increase") {
            item.quantity += 1;
        }

        if (action === "decrease") {
            item.quantity -= 1;

            if (item.quantity <= 0) {
                await item.deleteOne();
                return res.json({ status: "removed" });
            }
        }

        await item.save();

        return res.json({
            status: "updated",
            quantity: item.quantity,
        });

    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};


export const addComboToCart = async (req, res) => {
    try {
        const userId = req.user;
        const { comboId } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const combo = await Combo.findById(comboId);
        if (!combo) {
            return res.status(404).json({ message: "Combo not found" });
        }

        const existing = await Cart.findOne({
            user: userId,
            combo: comboId,
        });

        if (existing) {
            existing.quantity += 1;
            await existing.save();
            return res.json({ status: "updated" });
        }

        await Cart.create({
            user: userId,
            combo: comboId,
            price: combo.price,
            quantity: 1,
        });

        return res.status(201).json({ status: "added" });
    } catch (err) {
        console.error("ADD COMBO ERROR:", err.message);
        return res.status(500).json({ message: "Server error" });
    }
};
