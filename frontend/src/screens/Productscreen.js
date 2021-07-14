import React from 'react'
import { useEffect } from 'react'
import Ratings from './Ratings'
import { Button, Card, Col,Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { listproductdetails } from '../actions/productactions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Productscreen = ({match}) => {//here match is a builin parameter through which we can get the value of id from the url
    const dispatch=useDispatch()

    const productdetails=useSelector(state=>(state.productdetails))
    const {loading,error,product}=productdetails
    useEffect(()=>{
        dispatch(listproductdetails(match.params.id))
    },[dispatch,match])//add match here to remove warnings
     
    return (
        <div>
            {loading?<Loader />:error?<Message variant="danger" children={error}/>:<Row>
                <Link to="/">
                    <Button type="button"  className="btn btn-primary m-3 rounded">Go Back</Button>
                </Link>
                <Col md="6">
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md="3">
                    <ListGroup variant="flush">{/*variant="flush" is given for reducing the space between list items and to removes the lines around the list */}
                        <ListGroup.Item as="h3">{product.name}</ListGroup.Item>
                        <ListGroup.Item>
                        <Ratings value={product.rating}/> from {product.numReviews} reviews
                        </ListGroup.Item>
                        <ListGroup.Item><span style={{fontWeight:"800"}}>Price</span>:${product.price}</ListGroup.Item>
                        <ListGroup.Item><span style={{fontWeight:"800"}}>Description</span>:{product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md="3">
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>{product.countInStock>0?"In Stock":"Out of Stock"}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row className="px-2 py-1">
                                        <Button type="button" className="btn-block"disabled={product.countInStock>0?false:true}>Buy Now </Button>
                                    
                                        </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card> 
                </Col>
            </Row>}
            
        </div>
    )
}

export default Productscreen
