import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"//used for getting chrome redux-devtools extension
import { productlistreducer,productdetailsreducer } from "./reducers/productreducers";
import { cartreducer } from "./reducers/cartreducers"
import {userloginreducer, userregisterreducer} from "./reducers/userreducers"

const reducer=combineReducers({
    productlist:productlistreducer,//here productlist is the reducer name which would be visible in chrome
    productdetails:productdetailsreducer,
    cart:cartreducer,
    userlogin:userloginreducer,
    userregister:userregisterreducer
})

const cartitemsfromstorage=localStorage.getItem("cartitems")?JSON.parse(localStorage.getItem("cartitems")):[]//here we are using JSON.parse() because in local storage all datas will be stored in strings so we need to convert into json format before using it

const userinfofromstorage=localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):null

const initialstate={
    cart:{cartitems:cartitemsfromstorage},
    userlogin:{userinfo:userinfofromstorage}

}//this is the initialstate when the redux state loads

const middleware=[thunk]

const store=createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))//... is know as spread operator which spreads tht variable tht is it keeps it as it is 

export default store 