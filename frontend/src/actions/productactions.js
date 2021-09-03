import axios from "axios"
import {PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS, PRODUCT_PRODUCT_TOP_FAIL, PRODUCT_PRODUCT_TOP_REQUEST, PRODUCT_PRODUCT_TOP_SUCCESS} from "../constants/productconstants"

export const listproducts=(keyword="", pagenumber="")=>async(dispatch)=>{//this is a function inside a function this is done with the help of thunk,here this async(dispatch) returns dispatch()which is used by the outer function
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        
        const {data}=await axios.get(`/api/products?keyword=${keyword}&pagenumber=${pagenumber}`)//here if more than one query strings are passed in url; then used '&' to differntiate 2 query strings,(query strings are nothing but key value pair in the url for instance keyword=iph)
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
        //console.log(id)
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data}=await axios.get(`http://localhost:5000/api/products/${id}`)
        //console.log(data)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
    }
    catch(error)
    {
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.response && error.response.data.message ?error.response.data.message:error.message})
    }
}


export const deleteproduct=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:PRODUCT_DELETE_REQUEST})

        const {userlogin}=getState()
        const {userinfo}=userlogin

        const config={
            headers:{
                Authorization:`Bearer ${userinfo.token}`
            }
        }
        await axios.delete(`/api/products/${id}`,config)
        dispatch({type:PRODUCT_DELETE_SUCCESS})
    }
    catch(error)
    {
        dispatch({type:PRODUCT_DELETE_FAIL,payload:error.response && error.response.data.message ?error.response.data.message:error.message})
    }
}

export const createproduct=(id,product)=>async(dispatch,getState)=>{
    try{
        if(id==="0")
        {
            
            dispatch({type:PRODUCT_CREATE_REQUEST})

            const {userlogin}=getState()
            const {userinfo}=userlogin

            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${userinfo.token}`
                }
            }
            const {data}=await axios.post(`/api/products`,product,config)
            dispatch({type:PRODUCT_CREATE_SUCCESS,payload:data})
            dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})

        }
        else{
            console.log("entered")
            dispatch({type:PRODUCT_CREATE_REQUEST})

            const {userlogin}=getState()
            const {userinfo}=userlogin

            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${userinfo.token}`
                }
            }
            const {data}=await axios.post(`/api/products/${id}`,product,config)
            dispatch({type:PRODUCT_CREATE_SUCCESS,payload:data})
            dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
        }
    }
    catch(error)
    {
        dispatch({type:PRODUCT_CREATE_FAIL,payload:error.response && error.response.data.message ?error.response.data.message:error.message})
    }
}

export const createreview=(productid,review)=>async(dispatch,getState)=>{
    try{
        dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})

        const {userlogin}=getState()
        const {userinfo}=userlogin

        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userinfo.token}`
            }
        }
        await axios.post(`/api/products/${productid}/reviews`,review,config)
        dispatch({type:PRODUCT_CREATE_REVIEW_SUCCESS})
    }
    catch(error)
    {
        dispatch({type:PRODUCT_CREATE_REVIEW_FAIL,payload:error.response && error.response.data.message ?error.response.data.message:error.message})
    }
}

export const gettopratedproducts=()=>async(dispatch)=>{//this is a function inside a function this is done with the help of thunk,here this async(dispatch) returns dispatch()which is used by the outer function
    try{
        dispatch({type:PRODUCT_PRODUCT_TOP_REQUEST})
        
        const {data}=await axios.get(`/api/products/top`)//here if more than one query strings are passed in url; then used '&' to differntiate 2 query strings,(query strings are nothing but key value pair in the url for instance keyword=iph)
        //const res=await fetch("http://localhost:5000/api/products")
        //const data=await res.json()
        dispatch({type:PRODUCT_PRODUCT_TOP_SUCCESS,payload:data})

    }
    catch(error)
    {
        dispatch({type:PRODUCT_PRODUCT_TOP_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message})///here error.response is the built in error and error.response.data.message is the message that we display (the value of message is taken from errorhandler in "../.././backend/middlewares/errormiddlewares.js.errorhandler"),   if these both are present then our errorhandler gets executed else error.message gets executed(which is a built in error message by the computer)
    }
}
