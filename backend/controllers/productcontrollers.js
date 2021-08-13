import productmodels from "../models/productmodels.js"
import asynchandler from "express-async-handler"//used to wrap the contents within try catch block automatically



export const getproducts=asynchandler(async(req,res)=>{
    const products=await productmodels.find()//returns all the products
    // res.status(401)
    // throw new Error("Not found")
    res.json(products)
})

export const getproductsbyid=asynchandler(async(req,res,next)=>{
    // res.status(401)
    // throw new Error("Not founded")
    const product=await productmodels.findById(req.params.id)
    if(product)
        res.json(product)
    else
    {
        res.status(404)
        const error= new Error("Product not found")
        next(error)
    }
        
})