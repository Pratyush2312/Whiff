import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
import path from "path"

// ALWAYS load env from project root
dotenv.config({
  path: path.resolve(process.cwd(), "../.env")
})

console.log("Cloudinary key:", process.env.CLOUDINARY_API_KEY) // debug (temporary)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export default cloudinary
