import React,{useState,useEffect} from 'react'
import {Form,Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Formcontainer from "../components/Formcontainer"
import { savepaymentmethod } from '../actions/cartactions'
import Shippingsteps from '../components/Shippingsteps'

const Paymentscreen = ({history}) => {

    const cart=useSelector((state)=>state.cart)
    const {shippingaddress}=cart

    const [paymentmethod,setpaymentmethod]=useState("paypal");

    const dispatch=useDispatch()

    useEffect(()=>{
        if(!shippingaddress)//if shipping address is not there then go back to "/shipping" page
            history.push("/shipping")
    },[shippingaddress,history])

    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(savepaymentmethod(paymentmethod))
        history.push("/placeorder")  
    }

    return (
            <Formcontainer >
                <Shippingsteps step1="step1" step2="step2" step3="step3"/>
                <h1>Payment Method</h1>
                <Form onSubmit={submithandler} className="py-3">
                    <Form.Group>
                        <Form.Label as="legend">Select Method</Form.Label>{/*this as="legend" wraps the Select Method with legend tag ,legend tag increases the size of the font and makes it look good */}
                        
                        <div className="px-3">
                        <Form.Check type="radio" value="paypal" label="PayPal"  name="paymentmetho" checked onChange={(e)=>(setpaymentmethod(e.target.value))}></Form.Check>{/*here name attribute should be the same then only one radio box will be checked ifn the name attribute for different Form.Check tag exists then multiple radio buttons will be clicked */}
                        {/* <Form.Check type="radio" value="stripe" label="Stripe"  name="paymentmetho" onChange={(e)=>(setpaymentmethod(e.target.value))}></Form.Check> */}{/*this is how u can add different payment methods */}
                        </div>
                        <Button variant="primary" type="submit" className="my-3">Continue</Button>
                    </Form.Group>
                </Form>  
            </Formcontainer>
        
    )
}

export default Paymentscreen
