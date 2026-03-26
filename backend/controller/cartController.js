import { Cart } from "../models/cart.js";
import { Combo } from "../models/combo.js";
import { Perfume } from "../models/perfume.js"
/* ================= ADD TO CART ================= */

export const addToCart = async (req, res) => {
    try {
        const userId = req.user;
        const { itemId, itemType, volume } = req.body;
        if (!userId) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
        }

        const product =
            itemType === "Perfume"
                ? await Perfume.findById(itemId)
                : await Combo.findById(itemId);


        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        }
        let price, selectedVolume;
        if (itemType === 'Perfume') {

            selectedVolume = (volume || product.defaultVolume).toLowerCase().replace(" ", "");
            price = product.prices instanceof Map
                ? product.prices.get(selectedVolume)
                : product.prices[selectedVolume];
            console.log(price, selectedVolume)
        }
        else {
            selectedVolume = product.volume;
            price = product.price;
        }
        await Cart.create({
            user: userId,
            item: itemId,
            name: product.name,
            itemType,
            volume: selectedVolume,
            price: price,   
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
            .populate("item")
        // console.log(cartItems)
        return res.json({
            status: "success",
            cart: cartItems
        });

    } catch (err) {
        // console.log(err)
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



