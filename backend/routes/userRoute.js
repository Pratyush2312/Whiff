import express from 'express'
import { postUsersignup, postUserlogin, getProfile, logout } from '../controller/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import { User } from '../models/user.js'
const router=express.Router()

router.get('/profile',authMiddleware, getProfile)
router.post('/logout',authMiddleware,logout)
router.post('/signup', postUsersignup)
router.post('/login', postUserlogin)
router.get('/me', authMiddleware, (req, res) => {
    res.json({
        user:req.user
    })
} )
export default router