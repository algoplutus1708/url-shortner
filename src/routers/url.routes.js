import express from "express";
import { handleGenerateShortURL, handleGetAnalytics } from "../controller/url.controller.js";


const router = express.Router()

router.post('/',handleGenerateShortURL)
router.get("/analytics/:shortId",handleGetAnalytics)

export default router