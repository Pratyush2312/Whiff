import { razorpay } from "../config/razorpay.js"
import { Cart } from "../models/cart.js"
import { User } from "../models/user.js"
export const createOrder = async (req, res) => {
    try {
        const { userId } = req.user
        const { cartId } = req.body
        const user = await User.findById({ userId })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const cart = await Cart.findOne({ _id: cartId, user: userId })
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }
        let subtotal = 0
        cart.item.forEach(item => {
            subtotal += item.price * item.quantity
        })

        let discount = 0
        if (user.isFirstLogin) {
            discount = subtotal * 0.9
        }
        const finalTotal = subtotal - discount

        const options = {
            amount: finalTotal * 100,
            currency: 'INR',
            receipt: 'receipt_' + Date.now()
        }

        const order = await razorpay.orders.create(options)
        res.json(order)
    } catch (error) {
        console.log(error)
    }
}