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