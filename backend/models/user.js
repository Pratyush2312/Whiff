import mongoose from "mongoose"
const { Schema } = mongoose

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isFirstLogin: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export const User = mongoose.model('User', UserSchema)