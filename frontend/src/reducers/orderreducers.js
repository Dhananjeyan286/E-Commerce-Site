import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_RESET, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_GET_FAIL, ORDER_GET_MY_FAIL, ORDER_GET_MY_REQUEST, ORDER_GET_MY_RESET, ORDER_GET_MY_SUCCESS, ORDER_GET_REQUEST, ORDER_GET_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constants/orderconstants"

export const ordercreatereducer=(state={},action)=>{
    switch(action.type)
    {
        case ORDER_CREATE_REQUEST:
            return {...state,loading:true}
        case ORDER_CREATE_SUCCESS:
            return {loading:false,success:true,order:action.payload}
        case ORDER_CREATE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state            
    }
}

// import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderconstants"

// export const ordercreatereducer=(state={},action)=>{
//     switch(action.type)
//     {
//         case ORDER_CREATE_REQUEST:
//             return {loading:true}
//         case ORDER_CREATE_SUCCESS:
//             return {loading:false,success:true,order:action.payload}
//         case ORDER_CREATE_FAIL:
//             return {loading:false,error:action.payload}
//         default:    
//             return state
//     }
// }

export const orderdetailsreducer=(state={orderitems:[],shippingaddress:{},loading:true},action)=>{
    switch(action.type)
    {
        case ORDER_DETAILS_REQUEST:
            return {...state,loading:true}
        case ORDER_DETAILS_SUCCESS:
            return {loading:false,order:action.payload}
        case ORDER_DETAILS_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state            
    }
}

export const payorderreducer=(state={},action)=>{
    switch(action.type)
    {
        case ORDER_PAY_REQUEST:
            return {loading:true}
        case ORDER_PAY_SUCCESS:
            return {loading:false,success:true,payment:action.payload}
        case ORDER_PAY_FAIL:
            return {loading:false,error:action.payload}
        case ORDER_PAY_RESET:
            return {}   
        default:
            return state            
    }
}

export const listmyorderreducer=(state={orders:[]},action)=>{
    switch(action.type)
    {
        case ORDER_GET_MY_REQUEST:
            return {...state,loading:true}
        case ORDER_GET_MY_SUCCESS:
            return {loading:false,orders:action.payload}
        case ORDER_GET_MY_FAIL:
            return {loading:false,error:action.payload}
        case ORDER_GET_MY_RESET:
            return {orders:[]}    
        default:
            return state            
    }
}

export const listorderreducer=(state={orders:[]},action)=>{
    switch(action.type)
    {
        case ORDER_GET_REQUEST:
            return {...state,loading:true}
        case ORDER_GET_SUCCESS:
            return {loading:false,orders:action.payload}
        case ORDER_GET_FAIL:
            return {loading:false,error:action.payload}    
        default:
            return state            
    }
}

export const deliverorderreducer=(state={},action)=>{
    switch(action.type)
    {
        case ORDER_DELIVER_REQUEST:
            return {loading:true}
        case ORDER_DELIVER_SUCCESS:
            return {loading:false,success:true}
        case ORDER_DELIVER_FAIL:
            return {loading:false,error:action.payload}
        case ORDER_DELIVER_RESET:
            return {}   
        default:
            return state            
    }
}