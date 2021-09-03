import productmodels from "../models/productmodels.js"
import asynchandler from "express-async-handler"//used to wrap the contents within try catch block automatically



export const getproducts=asynchandler(async(req,res)=>{

    const pagesize=10//tells how many products should be displayed in a page
    const page=Number(req.query.pagenumber)||1//getting the current pg no. from the url

    const keyword=req.query.keyword?{
        name:{
            $regex:req.query.keyword,
            $options:"i",
        },
    }:{}

    const count=await productmodels.countDocuments({...keyword})//return the total no.of products available
    const products=await productmodels.find({...keyword}).limit(pagesize).skip(pagesize*(page-1))//limit is used to return a certain no.of products for instance if there are 100 products and limit(10) is given it returns n;ly 10 products and skip is used to skip the first n products for instance if skip(25) is given it skips the first 25 products
    // res.status(401)
    // throw new Error("Not found")
    res.json({products,page,pages:Math.ceil(count/pagesize)})//here pages returns the total no.of pages available and we use MAth.ceil() because if pagesize is 3 and the count is 11 and normal division is performed we get 3.666 so to get an integer value we are using ceil function
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

export const deleteproduct=asynchandler(async(req,res)=>{
    // res.status(401)
    // throw new Error("Not founded")
    const product=await productmodels.findById(req.params.id)
    if(product)
    {
        await productmodels.findByIdAndRemove(req.params.id)
        res.json({message:"Product removed successfully"})
    }
        
    else
    {
        res.status(404)
        throw new Error("Product not found")
    }
        
})

export const createproduct=asynchandler(async(req,res)=>{
    const productid=req.params.id
    if(productid)
    {
        const prod=await productmodels.findById(productid)
        if(prod)
        {
            prod.name=req.body.name||prod.name,
            prod.price=req.body.price||prod.price,
            prod.brand=req.body.brand||prod.brand,
            prod.category=req.body.category||prod.category,
            prod.countInStock=req.body.countInStock||prod.countInStock,
            prod.numReviews=req.body.numReviews||prod.numReviews,
            prod.description=req.body.description||prod.description,
            prod.user=req.user._id||prod.user,
            prod.image=req.body.image||prod.image

            const updatedprod=await prod.save()
            res.json(updatedprod)
        }
        else{
            res.status(404)
            throw new Error("Product not found")
        }
    }
    else{
        const product=new productmodels({
            name:req.body.name,
            price:req.body.price,
            brand:req.body.brand,
            category:req.body.category,
            countInStock:req.body.countInStock,
            numReviews:req.body.numReviews,
            description:req.body.description,
            user:req.user._id,
            image:req.body.image
        })
    
        const updatedproduct=await product.save()
        res.json(updatedproduct)
    }
        
    
})


export const createreview=asynchandler(async(req,res)=>{

    const {rating,comment}=req.body

    const productid=req.params.id
    const product=await productmodels.findById(productid)
    if(product)
    {
        const alreadyrevieweduser=product.reviews.find((r)=>r.user.toString()===req.user._id.toString())//checking to see if this product has already been reviewed by this user
        if(alreadyrevieweduser)
        {
            res.status(400)
            throw new Error("You have already reviewed this product")
        }
        else{
            const review={
                name:req.user.name,//these req.user details comes from protect in authmiddleware.js
                rating:Number(rating),//we are converting it to number for safety purposes nd then saving
                comment,
                user:req.user._id
            }
            product.reviews.push(review)
            product.numReviews=product.reviews.length
            product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length

            await product.save()

            res.status(200)
            res.send({message:"Your review has been successfully added"})
        }
    }
    else{
        res.status(404)
        throw new Error("No product found")
    }
        
    
})

export const gettopproducts=asynchandler(async(req,res)=>{
    const products=await productmodels.find().sort({rating:-1}).limit(3)//rating wise we are going to sort and we are using -1 to sort it in descending order

    res.json(products)
      
})