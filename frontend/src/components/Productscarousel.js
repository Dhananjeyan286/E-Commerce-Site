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
            <Carousel  pause="hover" className="bg-dark">{/*carousel keeps on moving so it pauses when mouse is placed on the carousel */}
                {products.map((product)=>(
                    <Carousel.Item>
                        <Link to={`/product/${product._id}`}>
                            <Carousel.Caption className="carousel-caption">
                                <h2>{product.name} (${product.price})</h2>
                            </Carousel.Caption>
                            <Image src={product.image} alt={product.name} fluid />
                            
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default Productscarousel
