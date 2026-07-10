import { razorpay } from "../config/razorpay.js"
import { Cart } from "../models/cart.js"
import { User } from "../models/user.js"
import { Order } from "../models/order.js";
import crypto from 'crypto';
import { transporter } from "../config/transport.js";
const secret = process.env.KEY_SECRET;

const sendOrderEmail = async (userEmail, order) => {
    const itemsList = order.items.map(
        (item) => `${item.name} (${item.volume}) x${item.quantity}`
    ).join("\n");

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Order Confirmed 🎉",
        text: `
Order ID: ${order.orderId}

Items:
${itemsList}

Total: ₹${order.totalAmount}

Thank you for shopping with us!
    `,
    };

    await transporter.sendMail(mailOptions);
};

const sendAdminEmail = async (order,user) => {
    const itemsList = order.items.map(
        (item) => `${item.name} (${item.volume}) x${item.quantity}`
    ).join("\n");

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: "🛒 New Order Received",
        text: `
New Order Placed!

Order ID: ${order.orderId}

Items:
${itemsList}

Total: ₹${order.totalAmount}

Customer ID: ${order.user}
Address: ${user.address}
    `,
    };

    await transporter.sendMail(mailOptions);
};

export const createOrder = async (req, res) => {
    try {
        const userId = req.user
        const { cartId } = req.body

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const cart = await Cart.findOne({ _id: cartId, user: userId })
            .populate('item')
        // console.log(cart)
        const cartItems = await Cart.find({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }




        let subtotal = 0;

        cartItems.forEach((item) => {
            subtotal += item.price * item.quantity;
        });


        let discount = 0;
        if (user.isFirstLogin) {
            discount = subtotal * 0.1;
        }
        let finalTotal = subtotal - discount;
        const options = {
            amount: Math.round(finalTotal * 100),
            currency: 'INR',
            receipt: 'receipt_' + Date.now()
        }

        const order = await razorpay.orders.create(options)
        res.json(order)
    } catch (error) {
        console.log(error)
    }
}

export const verifypayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.user
        // create hmac object to verify 
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        const generatedsignature = hmac.digest("hex")

        if (generatedsignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Payment not verified'
            });
        }

        // Verified → continue flow

        const cartItems = await Cart.find({ user: userId });

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }


        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        const userVerified = await User.findById(userId);

        let discount = 0;
        if (userVerified.isFirstLogin) {
            discount = subtotal * 0.1;
        }

        let totalamount = subtotal - discount;
        const orderItems = cartItems.map((item) => ({
            item: item.itemType,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            volume: item.volume,
        }));


        const newOrder = new Order({
            user: userId,
            items: orderItems,
            totalAmount: totalamount,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            paymentStatus: "paid",
        });

        await newOrder.save();

        await Cart.deleteMany({ user: userId });
        const user = await User.findById(userId);
        if (user.isFirstLogin) {
            user.isFirstLogin = false;
            await user.save();
        }
        await sendOrderEmail(user.email, newOrder);

        // admin email
        await sendAdminEmail(newOrder, user);
        return res.status(200).json({
            success: true,
            message: "Payment successful & order placed",
            orderId: newOrder.orderId,
        });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

// export const test = async (req, res) => {
//     const user = await User.findOne(); // ya kisi specific user ko find karo

//     const order = {
//         orderId: "TEST123",
//         totalAmount: 999,
//         user: user._id,
//         items: [
//             {
//                 name: "Perfume",
//                 volume: "100ml",
//                 quantity: 1,
//             },
//         ],
//     };

//     await sendAdminEmail(order, user);
//     console.log(user);
//     console.log(user.address);
//     res.send("Email sent");
// }