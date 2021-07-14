import mongoose from "mongoose"

const reviewmodel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

const productmodel=mongoose.Schema(
    {
        user:{//used to indicate the owner of this product
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"user"//it refers to the user model
        },
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true,
        },
        brand:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        reviews:[reviewmodel],
        rating:{
            type:Number,
            required:true,
            default:0
        },
        numReviews:{
            type:Number,
            required:true,
            default:0  
        },
        price:{
            type:Number,
            required:true,
            default:0
        },
        countInStock:{
            type:Number,
            required:true,
            default:0
        },
    },
    {
        timestamps:true//timestamps is set tot rue because it automatically creates the fields 'createdat' and 'updatedat' and stores its values when it is created orn updated automatically 
    }
)

const product=mongoose.model("product",productmodel)

export default product

