import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_GET_FAIL, ORDER_GET_MY_FAIL, ORDER_GET_MY_REQUEST, ORDER_GET_MY_SUCCESS, ORDER_GET_REQUEST, ORDER_GET_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderconstants"
import axios from "axios"

export const createorder=(order)=>async(dispatch,getState)=>{

    try{
        dispatch({type:ORDER_CREATE_REQUEST})

        const {userlogin:{userinfo}}=getState()

        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userinfo.token}`
            }
        }
    
        const {data}=await axios.post("/api/orders",order,config)
        
        dispatch({type:ORDER_CREATE_SUCCESS,payload:data})
        
    }
    catch(error)
    {
        dispatch({type:ORDER_CREATE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
    
}




// import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderconstants"
// import axios from "axios"

// export const createorder=(order)=>async(dispatch,getState)=>{

//     try{
//         dispatch({type:ORDER_CREATE_REQUEST})

//         const {userlogin:{userinfo}}=getState()

//         const config={
//             headers:{
//                 "Content-Type":"application/json",
//                 Authorization:`Bearer ${userinfo.token}`
//             }
//         }

//         const {data}=await axios.post("/api/orders",order,config)
        
//         dispatch({type:ORDER_CREATE_SUCCESS,payload:data})
        
//     }
//     catch(error)
//     {
//         dispatch({type:ORDER_CREATE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
//     }
// }


export const getorderdetails=(id)=>async(dispatch,getState)=>{

    try{
        dispatch({type:ORDER_DETAILS_REQUEST})

        const {userlogin:{userinfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userinfo.token}`
            }
        }
    
        const {data}=await axios.get(`/api/orders/${id}`,config)
        
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data})
        
    }
    catch(error)
    {
        dispatch({type:ORDER_DETAILS_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
    
}

export const makepayment=(orderid,paymentresult)=>async(dispatch,getState)=>{

    try{
        dispatch({type:ORDER_PAY_REQUEST})

        const {userlogin:{userinfo}}=getState()

        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userinfo.token}`
            }
        }
    
        const {data}=await axios.put(`/api/orders/${orderid}/pay`,paymentresult,config)
        
        dispatch({type:ORDER_PAY_SUCCESS,payload:data})
        
    }
    catch(error)
    {
        dispatch({type:ORDER_PAY_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
    
}

export const listorder=()=>async(dispatch,getState)=>{

    try{
        dispatch({type:ORDER_GET_MY_REQUEST})

        const {userlogin:{userinfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userinfo.token}`
            }
        }
    
        const {data}=await axios.get(`/api/orders/myorder`,config)
        
        dispatch({type:ORDER_GET_MY_SUCCESS,payload:data})
        
    }
    catch(error)
    {
        dispatch({type:ORDER_GET_MY_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
    
}

export const listallorder=()=>async(dispatch,getState)=>{

    try{
        dispatch({type:ORDER_GET_REQUEST})

        const {userlogin:{userinfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userinfo.token}`
            }
        }
    
        const {data}=await axios.get(`/api/orders`,config)
        
        dispatch({type:ORDER_GET_SUCCESS,payload:data})
        
    }
    catch(error)
    {
        dispatch({type:ORDER_GET_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
    
}

export const makedelivery=(order)=>async(dispatch,getState)=>{

    try{
        dispatch({type:ORDER_DELIVER_REQUEST})

        const {userlogin:{userinfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userinfo.token}`
            }
        }
    
        await axios.put(`/api/orders/${order._id}/deliver`,{},config)
        
        dispatch({type:ORDER_DELIVER_SUCCESS})
        
    }
    catch(error)
    {
        dispatch({type:ORDER_DELIVER_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
    
}
