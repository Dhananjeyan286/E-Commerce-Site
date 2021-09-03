import jwt from "jsonwebtoken"
import usermodel from "../models/usermodels.js"
import asynchandler from "express-async-handler"

export const protect=asynchandler(async(req,res,next)=>{//use next because in all middlewares we shld use next
    let token//giving token an undefined value

    //console.log(req.headers.authorization)//jwt token will be passed through the headers which can be recieved using req.headers.authorization

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){//here in the token we have manually added the "Bearer " word because tht is the usual practice 
        try{
            token=req.headers.authorization.split(" ")[1]//here token would be like "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWM2NGY0MmRmNTc3NjFkNDZjNzU5ZiIsImlhdCI6MTYyODQxODcyNywiZXhwIjoxNjMxMDEwNzI3fQ.dxMTW-ux8V5F9_bIKqxjPXB6ixOyxOoqf1-e4fzSWCg" so we are splitting with space so we get an array with 2 elements one is "Bearer" other is "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWM2NGY0MmRmNTc3NjFkNDZjNzU5ZiIsImlhdCI6MTYyODQxODcyNywiZXhwIjoxNjMxMDEwNzI3fQ.dxMTW-ux8V5F9_bIKqxjPXB6ixOyxOoqf1-e4fzSWCg" and we are chosing the second element

            //console.log(token)

            const decoded=jwt.verify(token,process.env.jwtsecret)//here jwt verifies whether the token is correct and returns the payload:data present in the jwt.io website to the decoded tht is it returns the data tht we stored in tht jwt token,here we are passing token and the secret code(process.env.jwtsecret) as parameters

            //console.log(decoded)

            req.user=await usermodel.findById(decoded.id).select("-password")//here we are getting every field except the password field tht is why we are putting minus password within brackets

            //console.log("authmiddleware finished"+req.user)

            //next()
        }
        catch(error)
        {
            //console.log("error in auth")
            //console.log(error)
            res.status(401)
            throw new Error("Not authorized and the token failed")
        }
        //console.log("finished")
    }

    if(!token)
    {
        //console.log("not of token")
        res.status(401)
        throw new Error("Not authorized and no token found")
    }
    //console.log("finish of auth")
    //res.end()
    next()//note no need to call next while writing throw new error(),next only needs to be called if other than error something is written
    //console.log("hello")
})

export const checkisadmin=asynchandler(async(req,res,next)=>{
    if(req.user && req.user.isadmin)
    next()
    else{
        res.status(404)
        throw new Error("The user is not an admin")
    }
})