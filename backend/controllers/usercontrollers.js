import usermodels from "../models/usermodels.js"
import asynchandler from "express-async-handler"//used to wrap the contents within try catch block automatically
import generatetoken from "../utills/generatetoken.js"


export const authuser=asynchandler(async(req,res)=>{
    //res.send("hello")
    const {email,password}=req.body
    
    const user=await usermodels.findOne({email:email})
    // if(user)
    // res.json({email:user.email,password:user.password})
    if(user && (await user.match(password,user.password)))
    {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isadmin:user.isadmin,
            token:generatetoken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

export const registeruser=asynchandler(async(req,res)=>{
    //res.send("hello")
    const {name,email,password}=req.body
    
    const user=await usermodels.findOne({email:email})
    // if(user)
    // res.json({email:user.email,password:user.password})
    if(user)
    {
        res.status(401)
        throw new Error("The user already exists")
    }
    else{
        const user =await usermodels.create({name:name,email:email,password:password})
        if(user)
        {
            res.status(201)
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isadmin:user.isadmin,
                token:generatetoken(user._id)
            })
        }
        else{
            res.status(401)
            throw new error("Invalid user data")
        }
    }
})

export const getuserprofile=asynchandler(async(req,res)=>{
    //res.send("success")
    //console.log("start of getuser")
    //console.log(req.user)
    const user=await usermodels.findById(req.user._id)

    //console.log("got user in user controller"+user)

    if(user){
        //console.log("entered user")
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isadmin:user.isadmin,
        })
        //console.log("exit user")
    }
    else{
        //console.log("enteres else of user")
        res.status(404)
        throw new error("User not found")
    }
    //console.log("finished of usercontroller")
})

export const updateuserprofile=asynchandler(async(req,res)=>{
    //res.send("success")
    //console.log("start of getuser")
    //console.log(req.user)
    const user=await usermodels.findById(req.user._id)

    //console.log("got user in user controller"+user)

    if(user){

        user.name=req.body.name||user.name
        user.email=req.body.email||user.email
        if(req.body.password)
        user.password=req.body.password
        //console.log("entered user")

        const updateduser=await user.save()
        res.json({
            _id:updateduser._id,
            name:updateduser.name,
            email:updateduser.email,
            isadmin:updateduser.isadmin,
            token:generatetoken(updateduser._id)//this is useless here
        })
        //console.log("exit user")
    }
    else{
        //console.log("enteres else of user")
        res.status(404)
        throw new error("User not found")
    }
    //console.log("finished of usercontroller")
})

export const getallusers=asynchandler(async(req,res)=>{
    const user=await usermodels.find()
    res.json(user)

})

export const deleteuser=asynchandler(async(req,res)=>{
    const user=await usermodels.findById(req.params.id)
    if(user)
    {
        await usermodels.findByIdAndRemove(req.params.id)
        res.json({message:"User removed"})

    }
    
    else
    {
        res.status(404)
        throw new Error("User not found")
    }
    

})

export const getuser=asynchandler(async(req,res)=>{
    const user=await usermodels.findById(req.params.id).select("-password")
    if(user)
    {
        res.json(user)

    }
    
    else
    {
        res.status(404)
        throw new Error("User not found")
    }
    

})

export const updateuser=asynchandler(async(req,res)=>{
    //res.send("success")
    //console.log("start of getuser")
    //console.log(req.user)
    const user=await usermodels.findById(req.params.id)

    //console.log("got user in user controller"+user)

    if(user){

        user.name=req.body.name||user.name
        user.email=req.body.email||user.email
        user.isadmin=req.body.isadmin//||user.isadmin
        

        const updateduser=await user.save()
        res.json({
            _id:updateduser._id,
            name:updateduser.name,
            email:updateduser.email,
            isadmin:updateduser.isadmin,
            token:generatetoken(updateduser._id)
        })
        
    }
    else{
        //console.log("enteres else of user")
        res.status(404)
        throw new error("User not found")
    }
    //console.log("finished of usercontroller")
})