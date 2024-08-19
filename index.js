import express from "express"
import connectDB from "./src/db/connect.js"
import {URL} from "./src/models/url.models.js"
import path from "path"
import cookieParser from "cookie-parser"
import { restrictToLoginUserOnly, checkAuth } from "./src/middleware/auth.js"


// Routes
import urlRoute from "./src/routers/url.routes.js"
import staticRoute from "./src/routers/staticRouter.routes.js"
import userRoute from "./src/routers/user.routes.js"


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
app.use(cookieParser())


//Database Connect
connectDB()

//Routes
//For EJS - Static Router
app.use("/",staticRoute,checkAuth)
app.use("/url",restrictToLoginUserOnly,urlRoute)
app.use("/user",userRoute)

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