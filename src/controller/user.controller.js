import { response } from "express"
import { User } from "../models/user.models.js"
import { setUser, getUser } from "../../service/auth.js"

import {v4 as uuidv4} from "uuid" // Used to make session ids

async function handleUserSignUp(req,res) {
    const {name,email,password} =req.body
    await User.create({name,email,password})
    return res.render("/")
}
async function handleUserLogin(req,res) {
    const {email,password} =req.body
    const user = await User.findOne({email,password})
    if(!user) res.render("login",{
        error : "Invalid email or password"
    })
    const sessionId =uuidv4()
    setUser(sessionId,user);
    res.cookie("uid",sessionId)
    return res.redirect("/")
}

export {handleUserSignUp, handleUserLogin}