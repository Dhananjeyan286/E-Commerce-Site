import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Row,Col,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addtocart,removefromcart } from '../actions/cartactions'

const Cartscreen = ({match,location,history}) => {//here location is used to get the qty value from the parameter of the link
    const productid=match.params.id 

    //console.log(productid)

    const qty=location.search?Number(location.search.split("=")[1]):0//location.search returns anything tht is present from the question mark in the link,here it returns "?qty=1" (take 1 as an example here it can come with any number but the point to be noted is tht it is a string and not a number therefore we wrap it with Number() property)  and then inside we split it with "=" sign so we get an array with two strings one before the "=" sign and one after the "=" sign ,so now inorder to get the one after the "=" sign we put "[1]" and if there is no location.search then return 0

    //console.log(qty)

    const dispatch=useDispatch()

    const cart=useSelector((state)=>(state.cart))
    const {cartitems}=cart

    //console.log(cartitems)

    useEffect(()=>{
        if(productid)
            dispatch(addtocart(productid,qty))

    },[dispatch,productid,qty])//here productid and qty gets updated everytime the if condition gets executed

    const removefromcarthandler=(id)=>{
        dispatch(removefromcart(id))
    }

    const checkouthandler=()=>{
        history.push("/login?redirect=shipping")//if they are not logged in the  they need to log in before checking out else if they are logged in then they can be redirected to shipping
    }

    return (
        <Row>
            <Col md="8">
                <h1>Shopping Cart</h1>
                {cartitems.length===0?(<Message >Your cart is empty <Link to="/" >Go Back</Link></Message>):(<ListGroup variant="flush">
                    {cartitems.map((item)=>(<ListGroup.Item key={item.product}>
                        <Row>
                            <Col md="2">
                                <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md="3" >
                                <Link style={{textDecoration: "none"}} to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>${item.price}</Col>{/*md="2" is same as md={2} */}
                            <Col md={2}>
                            <Form.Control style={{appearance:"auto",padding:"5px"}}as='select'  value={item.qty} onChange={(e)=>dispatch(addtocart(item.product,Number(e.target.value)))}>
                                    {[...Array(item.countInStock).keys()].map((x)=>
                                    {return <option key={x+1} value={x+1}>{x+1}</option>})}
                                    </Form.Control>
                            </Col>
                            <Col md="2">
                                <Button type="button" variant="light" onClick={()=>removefromcarthandler(item.product)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>))}
                </ListGroup>)}
            </Col>
            <Col md="4">
                <Card>
                <ListGroup variant="flush" style={{alignItems:"center"}}>
                    <ListGroup.Item>
                        <h2>
                            Subtotal ({cartitems.reduce((acc,item)=>acc+item.qty,0)}) items</h2>{/*here reduce is a method like map where first parameter is a value which stores the value each time for the present item which is the second parameter and the 0 here represents the initial value of the first parameter*/}
                            ${cartitems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}{/*here toFixed(2) represents 2 decimal places */}
                    </ListGroup.Item>    
                    <ListGroup.Item>
                        <Button type="button" className="btn-block" disabled={cartitems.length===0} onClick={checkouthandler}>Proceed to Checkout</Button>                    
                    </ListGroup.Item>                    
                </ListGroup>
                </Card>                                
            </Col>
        </Row>
    )
}

export default Cartscreen
