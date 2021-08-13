import jwt from "jsonwebtoken" //jwt is used for creating web tokens and passing it to the webpage to access restricted routes,for more info see www.jwt.io

const generatetoken=(id)=>{//id here refers to user id
    return jwt.sign({id:id},process.env.jwtsecret,{//jwtsecret is used like a password
        expiresIn:"30d"
    })//this is how u generate a jwt token and this expiresIn  means this token expires in and "30d" means 30 days
}

export default generatetoken