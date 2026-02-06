import express from "express";
import { getCombos } from "../controller/comboController.js";


const router = express.Router()

router.get("/", getCombos)
export default router
