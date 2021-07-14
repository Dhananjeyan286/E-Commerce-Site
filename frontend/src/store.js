import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"//used for getting chrome redux-devtools extension
import { productlistreducer,productdetailsreducer } from "./reducers/productreducers";

const reducer=combineReducers({
    productlist:productlistreducer,//here productlist is the reducer name which would be visible in chrome
    productdetails:productdetailsreducer
})

const initialstate={}//this is the initialstate when the redux state loads

const middleware=[thunk]

const store=createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))//... is know as spread operator which spreads tht variable tht is it keeps it as it is 

export default store