import express from 'express'
import { addToWishlist,removefromWishlist, showWishlist } from '../controller/wishlistController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router=express.Router()
router.get('/',authMiddleware,showWishlist)
router.post('/add',authMiddleware,addToWishlist)
router.delete('/:id',authMiddleware,removefromWishlist)
export default router