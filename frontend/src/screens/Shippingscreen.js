import React,{useState} from 'react'
import {Form,Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Formcontainer from "../components/Formcontainer"
import { saveshippingaddress } from '../actions/cartactions'
import Shippingsteps from '../components/Shippingsteps'

const Shippingscreen = ({history}) => {

    const cart=useSelector((state)=>state.cart)
    const {shippingaddress}=cart

    const [address,setaddress]=useState(shippingaddress.address);
    const [streetname,setstreetname]=useState(shippingaddress.streetname);
    const [cityname,setcityname]=useState(shippingaddress.cityname);
    const [postalcode,setpostalcode]=useState(shippingaddress.postalcode);
    const [countryname,setcountryname]=useState(shippingaddress.countryname);

    const dispatch=useDispatch()

    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(saveshippingaddress({address,streetname,cityname,postalcode,countryname}))
        history.push("/payment")  
    }

    return (
            <Formcontainer >
                <Shippingsteps step1="step1" step2="step2"/>
                <h1>Shipping</h1>
                <Form onSubmit={submithandler} className="py-3">
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter your address" value={address} onChange={(e)=>(setaddress(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="streetname">
                        <Form.Label>Street Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your street name" value={streetname} onChange={(e)=>(setstreetname(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="cityname">
                        <Form.Label>City Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your city name" value={cityname} onChange={(e)=>(setcityname(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="postalcode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter your postal code" value={postalcode} onChange={(e)=>(setpostalcode(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countryname">
                        <Form.Label>Country Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your country name" value={countryname} onChange={(e)=>(setcountryname(e.target.value))}></Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="my-3">Continue</Button>
                </Form>  
            </Formcontainer>
        
    )
}

export default Shippingscreen
