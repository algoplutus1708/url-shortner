import {nanoid} from "nanoid"

import {URL} from "../models/url.models.js"

async function handleGenerateShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"URL not found"})
    const shortID =nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory :[]
    })
    return res.render("home",{
        id:shortID
    })
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    // if(!result) throw new Error("Result not found");
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}
export {handleGenerateShortURL, handleGetAnalytics}