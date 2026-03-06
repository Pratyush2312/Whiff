import Razorpay from "razorpay";
import dotenv from 'dotenv'

dotenv.config()
const KEY = process.env.KEY
const KEY_SECRET = process.env.KEY_SECRET

export const razorpay = new Razorpay({
    key_id: KEY,
    key_secret: KEY_SECRET
})
