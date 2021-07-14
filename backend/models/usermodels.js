import mongoose from "mongoose"

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

const user=mongoose.model("user",usermodel)

export default user

