import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import {gettopratedproducts} from "../actions/productactions"

const Productscarousel = () => {

    const dispatch=useDispatch()

    const producttoprated=useSelector((state)=>state.producttoprated)
    const {loading,error,products}=producttoprated

    useEffect(()=>{
        dispatch(gettopratedproducts())
    },[dispatch])

    return (
        loading?<Loader />:error?<Message variant="danger" children={error} />:(
            <Carousel  pause="hover" interval="100000" className="bg-dark">{/*carousel keeps on moving so it pauses when mouse is placed on the carousel */}
                {products.map((product)=>(
                    <Carousel.Item>
                        <Link to={`/product/${product._id}`} style={{textDecoration:"none",paddingBottom:"0px !important"}}>
                            <Carousel.Caption  style={{position:"relative"}}>
                                <h2>{product.name} (${product.price})</h2>
                            </Carousel.Caption>
                            <center><Image src={product.image} alt={product.name} fluid  /></center>
                            
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default Productscarousel
