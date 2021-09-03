import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from 'react'
import { Row,Col } from 'react-bootstrap'
import { listproducts } from '../actions/productactions'
import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Paginate from '../components/Paginate'
import Productscarousel from '../components/Productscarousel'
import { Link } from 'react-router-dom'

const Homescreen = ({match}) => {

    const keyword=match.params.keyword
    const pagenumber=match.params.pagenumber||1

    const dispatch = useDispatch()

    const productlist=useSelector((state)=>(state.productlist))//this selects the state after the actions are executed,this productlist variable name comes from "../../store.js"
    const {loading,error,products,pages,page}=productlist//loading,error,products are the variables which we pass through the productreducers in "../reducers/productreducers.js"

    useEffect(()=>{
        dispatch(listproducts(keyword,pagenumber))//this triggers the function while this component is loaded because useEffect() executes when the component is loaded
    },[dispatch,keyword,pagenumber])//add dispatch within brackets to remove warnings,note here for each dispatch the below return statement gets executed 
    //1. for initial state loading and error are false and since proctus is set to an empty array in "../reducers/productreducers.js" no error pops up and nothing gets displayed
    //2.for product_list_request loading is true
    //3. for product_list_success loading is false,error is false and products.map is executed ,here products gets displayed
    //4.for product_list_fail loading is false and error is true

    //console.log(error)
    return (
        <>
            {!keyword ? 
            (<><h1>Top Rated Products</h1><Productscarousel /></>):(<Link to="/" className="btn btn-dark">Go Back</Link>)}
    
            <h1>Latest Products</h1> 
            
            {loading?<Loader />:error?<Message variant="danger" children={error}/>:(<><Row>
                {products.map((product)=>{
                    return <Col key={product._id} lg="3" className="py-2">
                       <Product product={product}/>
                    </Col>
                })}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword?keyword:""} />
            </>)}
                
        </>
    )
}

export default Homescreen
