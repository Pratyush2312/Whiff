import express from 'express'
import { postUsersignup, postUserlogin, getProfile, logout } from '../controller/userController.js'
import authMiddleware from '../middleware/authmiddleware.js'
const router=express.Router()

router.get('/profile',authMiddleware, getProfile)
router.post('/logout',authMiddleware,logout)
router.post('/signup', postUsersignup)
router.post('/login', postUserlogin)
export default router