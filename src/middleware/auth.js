import { getUser } from "../../service/auth.js"

async function restrictToLoginUserOnly(req,res) {
    const userUid = req.cookies?.uuid

    if(!userUid) return res.redirect("/login")
    const user = await getUser(userUid)

    if(!user) return res.redirect("/login")
    req.user=user
    next()
}

async function checkAuth(req,res) {
    const userUid = req.cookies?.uuid

    const user = await getUser(userUid)

    req.user=user
    next()
}

export {restrictToLoginUserOnly, checkAuth}