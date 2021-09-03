import {USER_LOGIN_FAIL,USER_LOGIN_SUCCESS,USER_LOGIN_REQUEST, USER_LOGOUT,USER_REGISTER_SUCCESS,USER_REGISTER_REQUEST,USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_REQUEST, USER_DETAILS_RESET, USER_LIST_FAIL, USER_LIST_SUCCESS, USER_LIST_REQUEST, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_GET_REQUEST, USER_GET_SUCCESS, USER_GET_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS} from "../constants/userconstants"
import axios from "axios"
import { ORDER_GET_MY_RESET } from "../constants/orderconstants"
//import {getState} from "react-redux"

export const login=(email,password)=>async(dispatch)=>{//this email and password comes from the form in loginscreen
    try{
        dispatch({type:USER_LOGIN_REQUEST})

        const config={
            headers:{
                "Content-Type":"application/json"//this is used for setting headers
            }
        }

        const {data}=await axios.post("/api/user/login",{email,password},config)//the first parameter is the route ,the second parameter is the data tht needs to be passed and the third parameter is the header tht needs to be set

        dispatch({type:USER_LOGIN_SUCCESS,payload:data})

        localStorage.setItem("userinfo",JSON.stringify(data))
    }
    catch(error){
        dispatch({type:USER_LOGIN_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}

export const logout=()=>async(dispatch)=>{
    try{
        localStorage.removeItem("userinfo")
        dispatch({type:USER_LOGOUT})
        dispatch({type:USER_DETAILS_RESET})
        dispatch({type:ORDER_GET_MY_RESET})
        dispatch({type:USER_LIST_RESET})
    }
    catch(error)
    {
        dispatch({type:USER_LOGIN_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}

export const register=(name,email,password)=>async(dispatch)=>{//this email and password comes from the form in loginscreen
    try{
        dispatch({type:USER_REGISTER_REQUEST})

        const config={
            headers:{
                "Content-Type":"application/json"//this is used for setting headers
            }
        }

        const {data}=await axios.post("/api/user",{name,email,password},config)//the first parameter is the route ,the second parameter is the data tht needs to be passed and the third parameter is the header tht needs to be set

        dispatch({type:USER_REGISTER_SUCCESS})

        dispatch({type:USER_LOGIN_SUCCESS,payload:data})

        localStorage.setItem("userinfo",JSON.stringify(data))
    }
    catch(error){
        dispatch({type:USER_REGISTER_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}

export const details=()=>async(dispatch,getState)=>{//this email and password comes from the form in loginscreen
    try{
        dispatch({type:USER_DETAILS_REQUEST})

        const {userlogin:{userinfo}}=getState()//you can use useSelector() inside screens folder in screens files but outside tht inorder to get data from redux use getState()
        //console.log(userinfo)
        const config={
            headers:{
                authorization:`Bearer ${userinfo.token}`//this is used for setting headers
            }
        }

        const {data}=await axios.get("/api/user/profile",config)//the first parameter is the route ,the second parameter is the data tht needs to be passed and the third parameter is the header tht needs to be set

        //console.log(data)
        //console.log(req.body._id)
        
        dispatch({type:USER_DETAILS_SUCCESS,payload:data})

        
    }
    catch(error){
        dispatch({type:USER_DETAILS_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}
export const update=(user)=>async(dispatch,getState)=>{//this email and password comes from the form in loginscreen
    try{
        dispatch({type:USER_UPDATE_PROFILE_REQUEST})

        const {userlogin:{userinfo}}=getState()//you can use useSelector() inside screens folder in screens files but outside tht inorder to get data from redux use getState()
        //console.log(userinfo)
        const config={
            headers:{
                "Content-Type":"application/json",
                authorization:`Bearer ${userinfo.token}`//this is used for setting headers
            }
        }

        const {data}=await axios.put("/api/user/profile",user,config)//the first parameter is the route ,the second parameter is the data tht needs to be passed and the third parameter is the header tht needs to be set

        //console.log(data)
        //console.log(req.body._id)
        
        dispatch({type:USER_UPDATE_PROFILE_SUCCESS,payload:data})

        
    }
    catch(error){
        dispatch({type:USER_UPDATE_PROFILE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}


export const listuser=()=>async(dispatch,getState)=>{//this email and password comes from the form in loginscreen
    try{
        dispatch({type:USER_LIST_REQUEST})

        const {userlogin:{userinfo}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${userinfo.token}`//this is used for setting headers
            }
        }

        const {data}=await axios.get("/api/user",config)//the first parameter is the route ,the second parameter is the data tht needs to be passed and the third parameter is the header tht needs to be set

        dispatch({type:USER_LIST_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type:USER_LIST_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}

export const userdelete=(id)=>async(dispatch,getState)=>{//this email and password comes from the form in loginscreen
    try{
        dispatch({type:USER_DELETE_REQUEST})

        const {userlogin:{userinfo}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${userinfo.token}`//this is used for setting headers
            }
        }

        await axios.delete(`/api/user/${id}`,config)//the first parameter is the route ,the second parameter is the data tht needs to be passed and the third parameter is the header tht needs to be set

        dispatch({type:USER_DELETE_SUCCESS})
    }
    catch(error){
        dispatch({type:USER_DELETE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}


export const userget=(id)=>async(dispatch,getState)=>{//this email and password comes from the form in loginscreen
    try{
        dispatch({type:USER_GET_REQUEST})

        const {userlogin:{userinfo}}=getState()

        const config={
            headers:{
                authorization:`Bearer ${userinfo.token}`//this is used for setting headers
            }
        }

        const {data}=await axios.get(`/api/user/${id}`,config)//the first parameter is the route ,the second parameter is the data tht needs to be passed and the third parameter is the header tht needs to be set

        dispatch({type:USER_GET_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type:USER_GET_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}

export const userupdate=(user)=>async(dispatch,getState)=>{//this email and password comes from the form in loginscreen
    try{
        dispatch({type:USER_UPDATE_REQUEST})

        const {userlogin:{userinfo}}=getState()

        const config={
            headers:{
                "Content-Type":"application/json",
                authorization:`Bearer ${userinfo.token}`//this is used for setting headers
            }
        }

        const {data}=await axios.put(`/api/user/${user._id}`,user,config)//the first parameter is the route ,the second parameter is the data tht needs to be passed and the third parameter is the header tht needs to be set

        dispatch({type:USER_UPDATE_SUCCESS,success:true})

        dispatch({type:USER_GET_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type:USER_UPDATE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}