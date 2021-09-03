import mongoose from "mongoose"

const ordermodel=mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"user"
        },
        orderitems:[//square bracket represents it is a array,we can give within orderitems or we can create a newschema at the top like in "./productmodels.js"
        {
            name:{
                type:String,
                required:true
            },
            qty:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"product"
            },
        }],
        shippingaddress:{
            address:{
                type:String,
                required:true
            },
            cityname:{
                type:String,
                required:true
            },
            postalcode:{
                type:String,
                required:true
            },
            countryname:{
                type:String,
                required:true
            },
            streetname:{
                type:String,
                required:true
            },
        },
        paymentmethod:{
            type:String,
            required:true,
        },
        paymentresult:{
            id:String,
            status:String,
            update_item:String,
            email_address:String
        },
        taxprice:{
            type:Number,
            required:true,
            default:0.0
        },
        shippingprice:{
            type:Number,
            required:true,
            default:0.0
        },
        totalprice:{
            type:Number ,
            required:true,
            default:0.0
        }, 
        ispaid:{
            type:Boolean,
            required:true,
            default:false
        },
        paidat:{
            type:Date,
        },
        isdelivered:{
            type:Boolean,
            required:true,
            default:false 
        },
        deliveredat:{
            type:Date,
        },
    },
    {
        timestamps:true//timestamps is set tot rue because it automatically creates the fields 'createdat' and 'updatedat' and stores its values when it is created orn updated automatically 
    }
)

const order=mongoose.model("order",ordermodel)

export default order

