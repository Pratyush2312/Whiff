import express from 'express'
import { getPerfumes, getPerfumesByslug } from '../controller/perfumeController.js'


const router = express.Router()        
router.get('/', getPerfumes)
router.get('/:slug', getPerfumesByslug)
export default router