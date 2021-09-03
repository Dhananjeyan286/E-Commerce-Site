import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"//used for getting chrome redux-devtools extension
import { productlistreducer,productdetailsreducer, productdeletereducer, productcreatereducer, reviewcreatereducer, producttopratedreducer } from "./reducers/productreducers";
import { cartreducer } from "./reducers/cartreducers"
import {userloginreducer, userregisterreducer,userdetailsreducer, userupdatereducer, userlistreducer, deleteuserreducer, getuserreducer, updateuserreducer} from "./reducers/userreducers"
import {deliverorderreducer, listmyorderreducer, listorderreducer, ordercreatereducer, orderdetailsreducer, payorderreducer} from "./reducers/orderreducers"

const reducer=combineReducers({
    productlist:productlistreducer,//here productlist is the reducer name which would be visible in chrome
    productdetails:productdetailsreducer,
    cart:cartreducer,
    userlogin:userloginreducer,
    userregister:userregisterreducer,
    userdetails:userdetailsreducer,
    userupdate:userupdatereducer,
    ordercreate:ordercreatereducer,
    orderdetails:orderdetailsreducer,
    payorder:payorderreducer,
    listmyorder:listmyorderreducer,
    userlist:userlistreducer,
    deleteuser:deleteuserreducer,
    getuser:getuserreducer,
    updateuser:updateuserreducer,
    productdelete:productdeletereducer,
    productcreate:productcreatereducer,
    listorder:listorderreducer,
    deliverorder:deliverorderreducer,
    reviewcreate:reviewcreatereducer,
    producttoprated:producttopratedreducer
})

const cartitemsfromstorage=localStorage.getItem("cartitems")?JSON.parse(localStorage.getItem("cartitems")):[]//here we are using JSON.parse() because in local storage all datas will be stored in strings so we need to convert into json format before using it

const userinfofromstorage=localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):null

const shippingaddressfromstorage=localStorage.getItem("shippingaddress")?JSON.parse(localStorage.getItem("shippingaddress")):{}

const paymentmethodfromstorage=localStorage.getItem("paymentmethod")?JSON.parse(localStorage.getItem("paymentmethod")):{}

const initialstate={
    cart:{cartitems:cartitemsfromstorage,shippingaddress:shippingaddressfromstorage,paymentmethod:paymentmethodfromstorage},
    userlogin:{userinfo:userinfofromstorage}

}//this is the initialstate when the redux state loads

const middleware=[thunk]

const store=createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))//... is know as spread operator which spreads tht variable tht is it keeps it as it is 

export default store 