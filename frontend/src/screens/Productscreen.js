import React from 'react'
import { useState,useEffect } from 'react'
import Ratings from '../components/Ratings'
import { Button, Card, Col,Image, ListGroup, Row ,Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { listproductdetails,createreview } from '../actions/productactions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productconstants"


const Productscreen = ({history,match}) => {//here match is a builin parameter through which we can get the value of id from the url
    const [qty,setqty]=useState(1)
    const [rating,setrating]=useState(1)
    const [comment,setcomment]=useState("")

    const dispatch=useDispatch()

    const productdetails=useSelector(state=>(state.productdetails))
    const {loading,error,product}=productdetails

    const reviewcreate=useSelector(state=>(state.reviewcreate))
    let {error:reviewerror,success:reviewsuccess}=reviewcreate

    const userlogin=useSelector(state=>(state.userlogin))
    const {userinfo}=userlogin

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        if(reviewsuccess)
        {
            alert("Review submitted")
            setrating(0)
            setcomment("")
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        //console.log(match.params.id)
        dispatch(listproductdetails(match.params.id))
    },[dispatch,match,reviewsuccess])//add match here to remove warnings
    
    const buynow=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)//here history means to redirect the page and we are sending qty as a parameter in the url
    }


    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(createreview(match.params.id,{rating,comment}))
    }

    return (
        <div>
            {loading?<Loader />:error?<Message variant="danger" children={error}/>:<><Row>
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

                            {product.countInStock>0 && <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col><Form.Control style={{appearance:"auto"}}as='select'  value={qty} onChange={(e)=>setqty(e.target.value)}>{/*here Form.Select tag not working so use Form.Control tag with attribute as="select" */}
                                    {[...Array(product.countInStock).keys()].map((x)=>
                                    {return <option key={x+1} value={x+1}>{x+1}</option>})}{/*here ...Array(product.countInStock).keys() is used to get an array like [0,1,2,3,4] based on the countInStock and note that the array starts from 0 so we use x+1 in the map function*/}
                                    </Form.Control></Col>
                                </Row>
                            </ListGroup.Item>}

                             <ListGroup.Item>
                                <Row className="px-2 py-1">
                                        <Button type="button" onClick={buynow}  className="btn-block"disabled={product.countInStock>0?false:true}>Buy Now </Button>
                                    
                                        </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card> 
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant="flush">
                        {product.reviews.map((review)=>(
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Ratings value={review.rating} />
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a customer review</h2>
                            {reviewerror && <Message variant="danger" children={reviewerror} />}
                            {userinfo ?(<Form onSubmit={submithandler}>
                                <Form.Group controlId="rating">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as="select" style={{appearance:"auto"}} value={rating} onChange={((e)=>setrating(e.target.value))}>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">6 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="comment">
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as="textarea" className="mb-3" value={comment} onChange={((e)=>setcomment(e.target.value))}></Form.Control>
                                </Form.Group>
                                <Button type="submit" variant="primary">Submit</Button>
                            </Form>):(<Message>Please <Link to="/login">sign in</Link> to write a review</Message>)}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>}
            
        </div>
    )
}

export default Productscreen
