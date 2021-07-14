const notfound=(req,res,next)=>{//in server.js always keep this last after every route if it kept as first then every route will come as error ,this is executed when user requests a route which is not present for instance the route "http://localhost:3000/virat" is not present so this block of code will be executed 
    const error=new Error(`This page is not found - ${req.originalUrl} and the status code is 404`)//this is how you create an error with the message inside it
    res.status(404)
    next(error)//we are passing this error variable to the errorhandler
}

const errorhandler=(err,req,res,next)=>{//error handler is a middleware which executes when an error has occured and this middleware should always start with the parameter "err" and not with "req"
    const statuscode=res.statusCode===200?500:res.statusCode//we are checking if the status code is 200 we are converting it to you 500 else we are keeping the same
    res.status(statuscode)
    res.json({
        message:err.message,
        stack:process.env.node_env==="production"?null:err.stack//if it is in "production" mode the  nothing is displayed else if it is in development mode the error stack space tree is displayed
    })
}


export {notfound,errorhandler}