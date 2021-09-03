import ordermodels from "../models/ordermodels.js"
import asynchandler from "express-async-handler"//used to wrap the contents within try catch block automatically



export const addorderitems=asynchandler(async(req,res)=>{

    //console.log(req.body)
    
    const {orderitems,shippingaddress,paymentmethod,itemsprice,taxprice,shippingprice,totalprice}=req.body

    //console.log(orderitems,shippingaddress,paymentmethod,itemsprice,taxprice,shippingprice,totalprice)

    if(orderitems && orderitems.length===0)//here first check orderitems is present and then check if orderitems.length===0 else if u check directly whether orderitems.length===0 then u wld get error because if orderitems is itself not present then orderitems.length will throw an error
    {
        res.status(400)
        throw new Error("No order items")
    }
    else{
        const createdorder=await ordermodels.create({orderitems:orderitems,user:req.user._id,shippingaddress:shippingaddress,paymentmethod:paymentmethod,itemsprice,taxprice,shippingprice,totalprice})
        //console.log(createdorder)
        res.status(201).json(createdorder)
        //console.log("entered")
    }
})

export const getorderitems=asynchandler(async(req,res)=>{

    const order =await ordermodels.findById(req.params.id).populate("user", "name email")////here populate means it will populate the user field tht is it will take the id from user field and populate the details of that particular user with tht id from the user table, here we ask to populate only name and email fields, note here there should be space after comma near "user" (here user is the name of the databse) and "name email" no comma should come in between and both should come under the same double quotes

    if(order)
        res.json(order)
    else{
        res.status(404)
        throw new Error("Order not found")
    }    

})

export const updateorder=asynchandler(async(req,res)=>{

    const order =await ordermodels.findById(req.params.id)

    if(order)
    {
        order.ispaid=true
        order.paidat=Date.now()
        order.paymentresult={
            id:req.body._id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address//all these data within paymentresult comes from paypal api
        }
        const updatedorder=await order.save()
        res.json(updatedorder)
    }
        
    else{
        res.status(404)
        throw new Error("Order not found")
    }    

})

export const getmyorder=asynchandler(async(req,res)=>{

    const order =await ordermodels.find({user:req.user._id})

    if(order)
    {
        res.json(order)
    }
        
    else{
        res.status(404)
        throw new Error("Order not found")
    }    

})

export const getorder=asynchandler(async(req,res)=>{

    const orders =await ordermodels.find().populate("user","name")

    if(orders)
    {
        res.json(orders)
    }
        
    else{
        res.status(404)
        throw new Error("Order not found")
    }    

})


export const updateorder2=asynchandler(async(req,res)=>{

    const order =await ordermodels.findById(req.params.id)

    if(order)
    {
        order.isdelivered=true
        order.deliveredat=Date.now()
        const updatedorder=await order.save()
        res.json(updatedorder)
    }
        
    else{
        res.status(404)
        throw new Error("Order not found")
    }    

})
