import express from 'express'
import { createOrder, verifypayment} from '../controller/paymentController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/create-order', authMiddleware, createOrder)
router.post('/verify-payment', authMiddleware, verifypayment)
// router.get("/test-admin-email", test)
export default router