import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from 'react'
import { Row,Col } from 'react-bootstrap'
import { listproducts } from '../actions/productactions'
import Product from "./Product"
import Loader from "../components/Loader"
import Message from "../components/Message"

const Homescreen = () => {
    const dispatch = useDispatch()

    const productlist=useSelector((state)=>(state.productlist))//this selects the state after the actions are executed,this productlist variable name comes from "../../store.js"
    const {loading,error,products}=productlist//loading,error,products are the variables which we pass through the productreducers in "../reducers/productreducers.js"

    useEffect(()=>{
        dispatch(listproducts())//this triggers the function while this component is loaded because useEffect() executes when the component is loaded
    },[dispatch])//add dispatch within brackets to remove warnings

    //console.log(error)
    return (
        <>
    
            <h1>Latest Products</h1> 
            
            {loading?<Loader />:error?<Message variant="danger" children={error}/>:(<Row>
                {products.map((product)=>{
                    return <Col key={product._id} lg="3" className="py-2">
                       <Product product={product}/>
                    </Col>
                })}
            </Row>)}
                
        </>
    )
}

export default Homescreen
