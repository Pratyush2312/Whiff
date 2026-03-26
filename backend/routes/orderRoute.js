import express from 'express'
import { getOrders, getOrderById } from '../controller/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.get("/orders", authMiddleware, getOrders);
router.get("/orders/:orderId", authMiddleware, getOrderById);
export default router;