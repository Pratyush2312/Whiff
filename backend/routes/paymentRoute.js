import express from 'express'
import { createOrder } from '../controller/paymentController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/', authMiddleware, createOrder)

export default router