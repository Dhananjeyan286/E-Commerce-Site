import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS} from "../constants/productconstants"

export const productlistreducer=(state={products:[]},action)=>{//here state is a parameter with the products array as an empty array
    switch(action.type){//we are using switch case to check which action.type we got 
        case PRODUCT_LIST_REQUEST:
            return {loading:true,products:[]}//loading is true because the product lists is loading so the products array is set to an empty array
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload}//here loading is false because we have the products array and it is got from action.payload
        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload}//here loading is false because we did not get any products array and so error is set to action.payload
        default:
            return state            
    }
}


export const productdetailsreducer=(state={product:{reviews:[]}},action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{loading:true,...state}//here we are passing the state object itself which is above
        case PRODUCT_DETAILS_SUCCESS:
            return{loading:false,product:action.payload}
        case PRODUCT_DETAILS_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state        
    }
}