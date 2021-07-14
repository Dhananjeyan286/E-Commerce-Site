import mongoose from "mongoose"

const connectdb =async()=>{
    try{
        const con=await mongoose.connect(process.env.mongo_uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        })
        console.log(`Databse connected ${con.connection.host}`)
    }
    catch(err)
    {
        console.log(err)
        process.exit(1)
    }
}

export default connectdb