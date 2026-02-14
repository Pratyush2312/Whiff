import express from 'express'
import { addToCart, getCart, removeFromCart,updateCart} from '../controller/cartController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router=express.Router()

router.post('/add',authMiddleware,addToCart)
router.get('/',authMiddleware,getCart)
router.delete('/remove/:cartId',authMiddleware,removeFromCart)
router.patch('/update',authMiddleware,updateCart)
// router.post('/add-combo',authMiddleware,addComboToCart)

export default router