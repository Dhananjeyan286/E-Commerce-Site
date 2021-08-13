import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const usermodel=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isadmin:{
            type:Boolean,
            required:true,
            default:false
        },
    },
    {
        timestamps:true//timestamps is set tot rue because it automatically creates the fields 'createdat' and 'updatedat' and stores its values when it is created orn updated automatically 
    }
)

// usermodel.methods.match=async function(enteredpassword){
//     return await bcrypt.compare(enteredpassword,this.password)//here this.password refers to hashed password from db
// }
usermodel.methods.match=async(enteredpassword,hashedpassword)=>{
    return await bcrypt.compare(enteredpassword,hashedpassword)//here this.password refers to hashed password from db
}//note in arrow functions this.password will not work because the keywords "this" and "super" will not work proper;y

usermodel.pre("save",async function(next){//here this function gets automatically executed when we save a document in the usermodels no need to call this function explicitly,this function is called when we create a new user or modify a user

    if(!this.isModified("password"))//this block gets executed not when user is creater it gets executed when the user name,email or other fields are modified and this if condition is false only when password field is modified if otherfields such as name,email are modified this block gets executed
    {
        next()//here if other fields other than password are modified it calls the next() function to get executed
    }
    //const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,10)//it hashes the password and stores it in this.password itself
})

const user=mongoose.model("user",usermodel)

export default user

