import { Wishlist } from "../models/wishlist.js"
import mongoose from "mongoose"

export const showWishlist = async (req, res) => {
    try {
        const userId = req.user
        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User Id is required'
            })
        }
        const wishlist = await Wishlist.find({ user: userId }).populate('perfume')
        const wishlistCount = wishlist.length
        // console.log(wishlist)
        if (wishlist === 0) {
            return res.status(404).json({
                status: 'empty',
                message: 'Nothing in your Wishlist'
            })
        }
        return res.status(200).json({
            status: 'success',
            wishlist: wishlist,
            length: wishlistCount,
            message: 'Your Wishlist'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}


export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user
        const { perfumeId } = req.body
        if (!userId || !perfumeId) {
            return res.status(400).json({
                message: "userId and productId are required"
            })
        }
        const exists = await Wishlist.findOne({ userId, perfumeId })
        if (exists) {
            return res.status(409).json({
                status: 'duplicate',
                message: "Product already in wishlist"
            })
        }
        const wishlistItem = await Wishlist.create({
            user: userId,
            perfume: perfumeId
        })
        console.log(wishlistItem)
        return res.status(201).json({
            status: 'success',
            message: "Added to wishlist",
            wishlistItem
        })

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'duplicate',
                message: "Perfume already in wishlist"
            })
        }
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export const removefromWishlist = async (req, res) => {
    try {
        const userId = req.user
        const { id } = req.params

        console.log(id)
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'User id and perfume id is required'

            })
        }
        // const userObjectId = new mongoose.Types.ObjectId(userId)
        // const perfumeObjectId = new mongoose.Types.ObjectId(id)

        const removed = await Wishlist.findOneAndDelete({
            user: userId,
            perfume: id
        })

        if (!removed) {
            return res.status(404).json({
                status: 'notfound',
                message: 'Perfume not in wishlist'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Removed from wishlist'
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: 'Error connecting to the server'
        })
    }
}