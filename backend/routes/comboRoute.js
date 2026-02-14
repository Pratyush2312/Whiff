import express from "express";
import { getCombos, getCombosbyslug } from "../controller/comboController.js";


const router = express.Router()

router.get("/", getCombos)
router.get("/:slug",getCombosbyslug)
export default router
