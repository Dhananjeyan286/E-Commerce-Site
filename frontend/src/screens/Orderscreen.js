import React,{useEffect,useState} from 'react'
import { Row,Col,ListGroup,Image,Card,Button } from 'react-bootstrap'
import {Link} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getorderdetails,makepayment,makedelivery} from  "../actions/orderactions"
import axios from "axios"
import {PayPalButton} from "react-paypal-button-v2"
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from "../constants/orderconstants"

const Orderscreen = ({match,history}) => {
    //console.log(window)
    const [scriptready,setscriptready]=useState(false)//we are using this because in script tag we have put script.async=true which means it is an async tag so it takes time to get ready so once it is ready we are setting sdkready to true and once sdkready is true we are adding it to the body at the last
    const dispatch=useDispatch()

    const id=match.params.id

    const orderdetails=useSelector((state)=>state.orderdetails)
    const {loading,error,order}=orderdetails
    //console.log(order)

    const payorder=useSelector((state)=>state.payorder)
    const {loading:loadingpay,success:successpay}=payorder//here we renaming loading to loadingpay because loading variable already exists above and we are doing the same for success variable too

    const deliverorder=useSelector((state)=>state.deliverorder)
    const {loading:loadingdeliver,success:successdeliver}=deliverorder

    const userlogin=useSelector((state)=>state.userlogin)
    const {userinfo}=userlogin

    useEffect(() => {

        if(!userinfo)//if user not logged in then redirect to login page
            history.push("/login")

        //inorder to us e paypal we need to add a script tag like this <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>, this script tag is obtained from the website https://developer.paypal.com/docs/checkout/reference/customize-sdk/

        const addpaypalscript=async()=>{
            const {data:clientid}=await axios.get("/api/config/paypal")//here we are getting everytg in the variable named data and we are renaming tht variable to clientid
            const script=document.createElement("script")
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientid}`
            script.async=true 
            script.onload=()=>{
                setscriptready(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successpay || successdeliver){//if there is no order then we dispatch getorderdetails() else if there is order and we have paid then also we dispatch getorderdetails() to update the ispaid field
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getorderdetails(id))
        }    
        else if(!order.ispaid){
            if(!window.paypal)//if payment is not made and if there is no paypal script then we call the addpaypalscript() function
                addpaypalscript()
            else//if payment is not made and if the paypal script is already added we set the setscriptready to true
                setscriptready(true)    
        }
            // eslint-disable-next-line
    }, [dispatch,id,successpay,order,successdeliver])

    if(!loading)
    {
        const adddecimals=(num)=>{//to add exactly 2 decimal places
        return (Math.round(num*100)/100).toFixed(2)
        }
    
        order.itemsprice=adddecimals(order.orderitems.reduce((acc,item)=>acc+item.price*item.qty,0))
    }

    const successpaymenthandler=(paymentresult)=>{
        //console.log(paymentresult)
        dispatch(makepayment(id,paymentresult))
    }

    const deliverhandler=()=>{
        dispatch(makedelivery(order))
    }

    return (
        <>
            <h1>Confirm Order</h1>
            {loading?<Loader />:error?<Message variant="danger" children={error} />:<Row>
                <Col md="8">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            
                                <p><strong style={{fontWeight:"900"}}>Name: </strong>
                                {order.user && order.user.name}</p>
                                <p><strong style={{fontWeight:"900"}}>Email ID: </strong>
                                {order.user && order.user.email}</p>
                                <strong style={{fontWeight:"900"}}>Address: </strong>
                                {order.shippingaddress.address}, {order.shippingaddress.streetname}, {order.shippingaddress.cityname} - {order.shippingaddress.postalcode}, {order.shippingaddress.countryname}   
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong style={{fontWeight:"900"}}>Method: </strong>
                            {order.paymentmethod}
                            <div className="py-3">{order.ispaid?<Message variant="success" children="Payment Made "/>:<Message variant="danger" children="Payment Yet to be Made "/>}</div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderitems.length===0?<Message>Your order is empty</Message>:order.orderitems.map((item,index)=>(
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
                            <div className="py-3">{order.isdelivered?<Message variant="success" children="Delivered "/>:<Message variant="danger" children="Not Delivered "/>}</div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md="4">
                    <Card>
                        <ListGroup variant="flush" >
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsprice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingprice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxprice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalprice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.ispaid && (<ListGroup.Item>
                                {loadingpay && <Loader />}
                                {!scriptready ? <Loader />:<PayPalButton amount={order.totalprice} onSuccess={successpaymenthandler} />}{/* <Paypalbutton amount={order.totalprice} onSuccess={successpaymenthandler} />//here amount refers to the amount to be paid and onSuccess refers to once the button is clicked what function needs to be called */}
                                
                            </ListGroup.Item>)}
                            {loadingdeliver && <Loader />}
                            {userinfo && userinfo.isadmin && order.ispaid && !order.isdelivered && (
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block" onClick={deliverhandler} style={{marginLeft:"35px"}}>Mark as delivered</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>    
            </Row>}
            </>
            
            
               
        
    )
}

export default Orderscreen
