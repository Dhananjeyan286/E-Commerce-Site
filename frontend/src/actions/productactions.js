import axios from "axios"
import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS} from "../constants/productconstants"

export const listproducts=()=>async(dispatch)=>{//this is a function inside a function this is done with the help of thunk,here this async(dispatch) returns dispatch()which is used by the outer function
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        
        const {data}=await axios.get("http://localhost:5000/api/products")
        //const res=await fetch("http://localhost:5000/api/products")
        //const data=await res.json()
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})

    }
    catch(error)
    {
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message})///here error.response is the built in error and error.response.data.message is the message that we display (the value of message is taken from errorhandler in "../.././backend/middlewares/errormiddlewares.js.errorhandler"),   if these both are present then our errorhandler gets executed else error.message gets executed(which is a built in error message by the computer)
    }
}

export const listproductdetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data}=await axios.get(`http://localhost:5000/api/products/${id}`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
    }
    catch(error)
    {
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.response && error.response.data.message ?error.response.data.message:error.message})
    }
}