import {CART_ADD_ITEM,CART_REMOVE_ITEM} from "../constants/cartconstants"

export const cartreducer=(state={cartitems:[]},action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item=action.payload
            const existitem=state.cartitems.find((x)=>(x.product===item.product))//here product is nothing _id from databse

            if(existitem)
            {
                return{
                    ...state,
                    cartitems:state.cartitems.map((x)=>(x.product===item.product?item:x))
                    // cartitems:state.cartitems.map((x)=>{
                    //     if(x.product===item.product){
                    //         item.qty=item.qty+x.qty
                    //         return item
                    //     }
                    //     else
                    //         return x
                    // })
                }
            }
            else{
                return {
                    ...state,
                    cartitems:[...state.cartitems,item]
                }
            }

        case CART_REMOVE_ITEM:
            return{
                ...state,cartitems:state.cartitems.filter((x)=>x.product!==action.payload)
            }    

        default:
            return state    

    }
}