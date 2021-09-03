import React,{useEffect} from 'react'
import { Button,Row,Col,ListGroup,Image,Card } from 'react-bootstrap'
import {Link} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Shippingsteps from '../components/Shippingsteps'
import {createorder} from  "../actions/orderactions"

const Placeorderscreen = ({history}) => {
    const dispatch=useDispatch()

    const cart=useSelector((state)=>state.cart)

    const ordercreate=useSelector((state)=>state.ordercreate)
    const {loading,error,success,order}=ordercreate
    //console.log(order)

    useEffect(() => {
        if(success)
        {
            history.push(`/order/${order._id}`)//here order._id should be added to dependancy array else it will show waroning, but here order._id initially wld'nt exist so we should not add it to dependancy array if we add we will get an error stating order._id does'nt exist, so the below comment line should be added
        }
        // eslint-disable-next-line
    }, [history,success])

    const placeorderhandler=()=>{
        dispatch(createorder({orderitems:cart.cartitems,shippingaddress:cart.shippingaddress,paymentmethod:cart.paymentmethod,itemsprice:cart.itemsprice,taxprice:cart.taxprice,shippingprice:cart.shippingprice,totalprice:cart.totalprice}))
    }

    // const ordercreate=useSelector(state=>state.ordercreate)
    // const {order,success,error,loading}=ordercreate

    // useEffect(()=>{
    //     if(success)
    //         history.push(`/order/${order._id}`)
    //     // eslint-disable-next-line
    // },[history,success])

    // const placeorderhandler=()=>{
    //     dispatch(createorder({
    //         orderitems:cart.cartitems,shippingaddress:cart.shippingaddress,paymentmethod:cart.paymentmethod,itemsprice:cart.itemsprice,shippingprice:cart.shippingprice,taxprice:cart.taxprice,totalprice:cart.totalprice
    //     }))
    // }

    const adddecimals=(num)=>{//to add exactly 2 decimal places
        return (Math.round(num*100)/100).toFixed(2)
    }

    //Calculate Prices
    
    
    cart.itemsprice=adddecimals(cart.cartitems.reduce((acc,item)=>acc+item.price*item.qty,0))

    //console.log(cart.itemsprice)


    cart.shippingprice=adddecimals(cart.itemsprice>100?0:100)

    cart.taxprice=adddecimals((0.15*cart.itemsprice).toFixed(2))

    cart.totalprice=(
        Number(cart.itemsprice)+Number(cart.shippingprice)+Number(cart.taxprice)
    ).toFixed(2)

    return (
        <>
            {loading&&<Loader />}
            {error&&<Message variant="danger" children={error} />}
            <Shippingsteps step1="step1" step2="step2" step3="step3" step4="step4"/>
            <Row>
                <Col md="8">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong style={{fontWeight:"900"}}>Address: </strong>
                                {cart.shippingaddress.address}, {cart.shippingaddress.streetname}, {cart.shippingaddress.cityname} - {cart.shippingaddress.postalcode}, {cart.shippingaddress.countryname}   
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong style={{fontWeight:"900"}}>Method: </strong>
                            {cart.paymentmethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartitems.length===0?<Message>Your cart is empty</Message>:cart.cartitems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md="2">
                                            <Image src={item.image} alt={item.name} fluid rounded />        
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`} style={{textDecoration:"none"}}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md="5">
                                            {item.qty} x ${item.price} = ${(item.qty*item.price).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>    
                            ))}
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md="4">
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsprice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingprice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxprice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalprice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cart.cartitems===0} onClick={placeorderhandler}>Place Order</Button>            
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>    
            </Row>   
        </>
    )
}

export default Placeorderscreen
