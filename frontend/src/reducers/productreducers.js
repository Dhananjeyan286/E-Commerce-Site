import {PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS, PRODUCT_PRODUCT_TOP_FAIL, PRODUCT_PRODUCT_TOP_REQUEST, PRODUCT_PRODUCT_TOP_SUCCESS} from "../constants/productconstants"

export const productlistreducer=(state={products:[]},action)=>{//here state is a parameter with the products array as an empty array
    switch(action.type){//we are using switch case to check which action.type we got ,here initially set products as an epmty array because in "../screens/Homescreen.js" during initialisation loading is false ,error is false so products.map is executed in initialisation ,so when products is not initialised to an empty array here then it will be undefined so map property cannot be used here so initialise the products to an empty array so map property is possible in an empy array tht is it displays nothing and no error also comes"
        case PRODUCT_LIST_REQUEST:
            return {loading:true,...state}//loading is true because the product lists is loading so the products array is set to an empty array,here we are passing the state object itself which is above
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload.products,pages:action.payload.pages,page:action.payload.page}//here loading is false because we have the products array and it is got from action.payload
        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload}//here loading is false because we did not get any products array and so error is set to action.payload
        default:
            return state            
    }
}


export const productdetailsreducer=(state={product:{reviews:[]}},action)=>{//here reviews is set to an empty array whose use is needed to be checked  in the future
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{...state,loading:true}//here we are passing the state object itself which is above
        case PRODUCT_DETAILS_SUCCESS:
            return{loading:false,product:action.payload}
        case PRODUCT_DETAILS_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state        
    }
}

export const productdeletereducer=(state={},action)=>{//here reviews is set to an empty array whose use is needed to be checked  in the future
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return{loading:true}//here we are passing the state object itself which is above
        case PRODUCT_DELETE_SUCCESS:
            return{loading:false,success:true}
        case PRODUCT_DELETE_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state        
    }
}

export const productcreatereducer=(state={productdetail:{}},action)=>{//here reviews is set to an empty array whose use is needed to be checked  in the future
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return{...state,loading:true}//here we are passing the state object itself which is above
        case PRODUCT_CREATE_SUCCESS:
            return{loading:false,success:true,productdetail:action.payload}
        case PRODUCT_CREATE_FAIL:
            return{loading:false,error:action.payload}
        case PRODUCT_CREATE_RESET:
            return {}    
        default:
            return state        
    }
}


export const reviewcreatereducer=(state={},action)=>{//here reviews is set to an empty array whose use is needed to be checked  in the future
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return{loading:true}//here we are passing the state object itself which is above
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return{loading:false,success:true}
        case PRODUCT_CREATE_REVIEW_FAIL:
            return{loading:false,error:action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}    
        default:
            return state        
    }
}

export const producttopratedreducer=(state={products:[]},action)=>{//here reviews is set to an empty array whose use is needed to be checked  in the future
    switch(action.type){
        case PRODUCT_PRODUCT_TOP_REQUEST:
            return{...state,loading:true}//here we are passing the state object itself which is above
        case PRODUCT_PRODUCT_TOP_SUCCESS:
            return{loading:false,products:action.payload}
        case PRODUCT_PRODUCT_TOP_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state        
    }
}