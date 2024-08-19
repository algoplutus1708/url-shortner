import express from "express"
import urlRoute from "./src/routers/url.router.js"
import connectDB from "./src/db/connect.js"
import {URL} from "./src/models/url.models.js"
import path from "path"

const app= express()
const PORT = 8000

//EJS
app.set("view engine", "ejs")
app.set("views", path.resolve("./views")) // We have to import path module


//Checking EJS
app.get("/tets", async(req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home")
})


//Middleware
app.use(express.json())

//Database Connect
connectDB()

//Routes
app.use("/url",urlRoute)

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );
    if (entry) {
        res.redirect(entry.redirectURL);
    } else {
        res.status(404).send("URL not found");
    }
});
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})