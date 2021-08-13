import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS} from "../constants/productconstants"

export const productlistreducer=(state={products:[]},action)=>{//here state is a parameter with the products array as an empty array
    switch(action.type){//we are using switch case to check which action.type we got ,here initially set products as an epmty array because in "../screens/Homescreen.js" during initialisation loading is false ,error is false so products.map is executed in initialisation ,so when products is not initialised to an empty array here then it will be undefined so map property cannot be used here so initialise the products to an empty array so map property is possible in an empy array tht is it displays nothing and no error also comes"
        case PRODUCT_LIST_REQUEST:
            return {loading:true,...state}//loading is true because the product lists is loading so the products array is set to an empty array,here we are passing the state object itself which is above
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload}//here loading is false because we have the products array and it is got from action.payload
        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload}//here loading is false because we did not get any products array and so error is set to action.payload
        default:
            return state            
    }
}


export const productdetailsreducer=(state={product:{reviews:[]}},action)=>{//here reviews is set to an empty array whose use is needed to be checked  in the future
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