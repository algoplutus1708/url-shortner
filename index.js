import express from "express"
import urlRoute from "./src/routers/url.router.js"
import connectDB from "./src/db/connect.js"
import {URL} from "./src/models/url.models.js"
import path from "path"
import staticRoute from "./src/routers/staticRouter.routes.js"



const app= express()
const PORT = 8000

//EJS
app.set("view engine", "ejs")
app.set("views", path.resolve("./src/views")) // We have to import path module


//Checking EJS - Server Side Rendering (SSR)
app.get("/tests", async(req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home",{
        urls:allUrls,
    })
})


//Middleware
app.use(express.json()) // To parse json data
app.use(express.urlencoded({extended:false}))

//Database Connect
connectDB()

//Routes
//For EJS - Static Router
app.use("/",staticRoute)
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