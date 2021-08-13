import express from "express"//include '"type":"module" in package.json to use ES6 methods in node'
const app=express()
import dotenv from "dotenv"
import connectdb from "./config/db.js"
import productsroute from "./routes/productsroute.js"//"while using ES6 in node make sure to include ".js" for file extensions else it will consider it as a path and not as a path ,for eg "./products" will look for products path and not for a file whereas "./products.js" will look for a js file in current directory
import userroute from "./routes/userroutes.js"
dotenv.config({path:"./backend/config/config.env"})//here we have installed dotenv in e-commerce site so in server.js the path should be from e-commercer site tht is the path should be "./backend/config/config.env" and the path should not start from server.js tht is the path shld not be "./config/config.env"
connectdb()
import {errorhandler,notfound } from "./middlewares/errormiddleware.js"

app.use(express.json())//for getting form data from req.body

app.get("/",(req,res)=>{
    res.send("hi")
})
 
app.use("/api/products",productsroute)
app.use("/api/user",userroute)

app.use(notfound)
app.use(errorhandler)


const port=process.env.port || 5000
app.listen(port,()=>{console.log(`Server running on ${process.env.node_env} mode on port ${port}`)})
