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
dotenv.config({ path: "../.env" })
const URL=process.env.FRONTEND_URL
const MONGO_URL=process.env.MONGO_URL
const PORT=process.env.PORT||3000
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin:URL,
    credentials:true
}))
app.use(cookieParser())
mongoose.connect(MONGO_URL)
app.use("/uploads", express.static("uploads"));
app.use('/perfumes', perfumeRoute)
app.use('/perfumes/:slug', perfumeRoute)
app.use('/account', userRoute)
app.use('/account/signup', userRoute)
app.use('/account/login', userRoute)
app.use('/account/profile', userRoute)
app.use('/account/logout', userRoute)
app.use('/wishlist',wishlistRoute)
app.use('/wishlist/add', wishlistRoute)
app.use('/wishlist/:perfumeid',wishlistRoute)
app.use('/cart',cartRoute)
app.use('/cart/add',cartRoute)
app.use('/cart/remove/:cartId',cartRoute)
app.use('/cart/update',cartRoute)
app.use("/combos", comboRoute);
app.use("/api/upload", uploadRoute)

// app.get('/perfumes',async (req,res)=>{
//     const perfume=await Perfume.findOne({id:1})
//     res.send(perfume)
// })

app.listen(PORT, () => {
    console.log("Server is Live")
})