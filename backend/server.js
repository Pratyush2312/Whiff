import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import perfumeRoute from './routes/perfumeRoute.js'
import userRoute from './routes/userRoute.js'
import wishlistRoute from './routes/wishlistRoute.js'
import cartRoute from './routes/cartRoute.js'
import comboRoute from "./routes/comboRoute.js"
import uploadRoute from "./routes/uploadRoute.js"
import paymentRoute from "./routes/paymentRoute.js"
import orderRoute from "./routes/orderRoute.js"
dotenv.config({ path: "../.env" })
const URL = process.env.FRONTEND_URL
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: URL,
    credentials: true
}))
app.use(cookieParser())
mongoose.connect(MONGO_URL)
app.use("/uploads", express.static("uploads"));
app.use('/perfumes', perfumeRoute)
app.use('/perfumes/:slug', perfumeRoute)
app.use('/account', userRoute)
app.use('/wishlist', wishlistRoute)
app.use('/wishlist/add', wishlistRoute)
app.use('/wishlist/:perfumeid', wishlistRoute)
app.use('/cart', cartRoute)
app.use('/cart/add', cartRoute)
app.use('/cart/remove/:cartId', cartRoute)
app.use('/cart/update', cartRoute)
app.use("/combos", comboRoute);
app.use("/combos/:slug", comboRoute);
app.use('/order',paymentRoute)
app.use('/order/create-order', paymentRoute)
app.use('order/verify-payment', paymentRoute)
// app.use('/order/test-admin-email',paymentRoute)
app.use('/api', orderRoute);
app.use('/api/orders', orderRoute);
app.use('/api/order/:orderId', orderRoute);

app.listen(PORT, () => {
    console.log("Server is Live", PORT);
})