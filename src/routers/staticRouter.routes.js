import express from "express";
import { URL } from "../models/url.models.js";

const router = express.Router()

router.get("/",async(req,res)=>{
    if(!req.user) return res.redirect("login")
    const allurls = await URL.find({createdBy: req.user._id})
    return res.render('home',{
        urls:allurls
    })
})

router.get("/signup",(req,res)=>{
    return res.render("Signup")
})
router.get("/login",(req,res)=>{
    return res.render("Login")
})

export default router