import express from "express"//include '"type":"module" in package.json to use ES6 methods in node'
const app=express()
import dotenv from "dotenv"
import connectdb from "./config/db.js"
import productsroute from "./routes/productsroute.js"//"while using ES6 in node make sure to include ".js" for file extensions else it will consider it as a path and not as a path ,for eg "./products" will look for products path and not for a file whereas "./products.js" will look for a js file in current directory
import userroute from "./routes/userroutes.js"
dotenv.config({path:"./backend/config/config.env"})//here we have installed dotenv in e-commerce site so in server.js the path should be from e-commercer site tht is the path should be "./backend/config/config.env" and the path should not start from server.js tht is the path shld not be "./config/config.env"
connectdb()
import {errorhandler,notfound } from "./middlewares/errormiddleware.js"
import orderroutes from "./routes/orderroutes.js"
import uploadroutes from "./routes/uploadroutes.js"
import path from "path"

app.use(express.json())//for getting form data from req.body

app.get("/",(req,res)=>{
    res.send("hi")
})
 
app.use("/api/products",productsroute)
app.use("/api/user",userroute)
app.use("/api/orders",orderroutes)
app.use("/api/upload",uploadroutes)
app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.paypalclientid)
})

const __dirname=path.resolve()//we are doing this because __dirname will not work in es6 modules it will work in normal node js format but here we are using es6 modules for eg in first few lines "import uploadroutes from "./routes/uploadroutes.js"" this is an es6 format the nrml format is const uploadroutes=require("./routes/uploadroutes.js") so first itself we are setting __dirname from path.resolve() resolve means to split the object
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))//here we are doing this to set the "uploads" file as a static file

app.use(notfound)
app.use(errorhandler)


const port=process.env.port || 5000
app.listen(port,()=>{console.log(`Server running on ${process.env.node_env} mode on port ${port}`)})
