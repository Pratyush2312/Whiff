import express from 'express'
import { getPerfumes, getPerfumesByslug } from '../controller/perfumeController.js'
// import upload from "../middleware/upload.js"
// import { Perfume } from "../models/perfume.js"

const router = express.Router()
// router.post(
//     "/",
//     upload.single("image"),
//     async (req, res) => {
//         try {
//             const perfume = await Perfume.create({
//                 name: req.body.name,
//                 brand: req.body.brand,
//                 price: req.body.price,
//                 category: req.body.category,
//                 volume: req.body.volume,
//                 slug: req.body.slug,
//                 byWhiff: req.body.byWhiff,
//                 image: req.file.path
//             })
//             res.status(201).json(perfume)
//         } catch (err) {
//             res.status(500).json({ error: err.message })
//         }
//     }
// )

router.get('/', getPerfumes)
router.get('/:slug', getPerfumesByslug)
export default router