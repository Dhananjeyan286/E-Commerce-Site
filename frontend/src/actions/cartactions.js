import {CART_ADD_ITEM,CART_REMOVE_ITEM} from "../constants/cartconstants"
import axios from "axios"


export const addtocart=(id,qty)=>async(dispatch,getState)=>{//here getState is used to get the data from the state such as productdetails,productdetails,cart
    const {data}=await axios.get(`http://localhost:5000/api/products/${id}`)

    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty:qty
        }
        //payload:data
    })

    localStorage.setItem("cartitems",JSON.stringify(getState().cart.cartitems))//localstorage is used to store small datas for a particular page in the browser ,note here we use JSON.stringify() because in localstorage we can store only strings and not numbers or anything else
}

export const removefromcart=(id)=>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })

    localStorage.setItem("cartitems",JSON.stringify(getState().cart.cartitems))
}