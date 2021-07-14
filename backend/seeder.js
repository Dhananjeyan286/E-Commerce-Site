/* 
       This file is used for testing whether the data is entered in mongodb correctly
                                                           */
import dotenv from"dotenv"
import users from "./data/users.js"
import products from "./data/products.js"
import usermodels from "./models/usermodels.js"
import productmodels from "./models/productmodels.js"
import ordermodels from "./models/ordermodels.js"
import mongoose from "mongoose"
import connectdb from "./config/db.js"


dotenv.config({path:"./backend/config/config.env"})

connectdb()

const importdata=async()=>{
    try{
        await ordermodels.deleteMany()//this will clear all the documents or data in this ordermodels table or collection
        await usermodels.deleteMany()
        await  productmodels.deleteMany()

        const usersdata=await usermodels.insertMany(users)//usersdata will store the users information in the form of array
        //console.log(usersdata)
        const adminid=usersdata[0]._id//we can get the id of the first user because the first user is the admin user

        const tempdata=products.map((product)=>{
            return {...product,user:adminid}//we are adding the adminid to every product
        })

        await productmodels.insertMany(tempdata)
        console.log("data imported")
        process.exit(0)
    }
    catch(err)
    {
        console.log(err)
        process.exit(1)
    }
}

const exportdata=async()=>{
    try{
        await ordermodels.deleteMany()//this will clear all the documents or data in this ordermodels table or collection
        await usermodels.deleteMany()
        await productmodels.deleteMany()
        console.log("data exported")
        process.exit(0)
    }
    catch(err)
    {
        console.log(err)
        process.exit(1)
    }
}

if(process.argv[2]==="-d")//process.argv is similar to command line arguments if command line consists of "-d" then exportdata() is executed else if the command line does'nt contain any arguments then importdata() is executed
    exportdata()
else
    importdata()    