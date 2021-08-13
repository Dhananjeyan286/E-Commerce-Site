import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form,Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {login} from "../actions/useractions"
import Formcontainer from "../components/Formcontainer"

const Loginscreen = ({location,history}) => {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

    const dispatch=useDispatch()

    const userlogin=useSelector((state)=>state.userlogin)
    const {loading,error,userinfo}=userlogin

    const redirect=location.search?`/${location.search.split("=")[1]}`:"/"

    useEffect(()=>{
        if(userinfo)
        {
            history.push(redirect)
        }
    },[history,userinfo,redirect])//the array here is known as dependancy array,useEffect gets executed whenever the elements in the dependancy array gets updated

    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }

    return (
            <Formcontainer>
            <h1>Sign In</h1>
            {loading?<Loader />:error?<Message variant="danger" children={error} />:<><Form onSubmit={submithandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email ID" value={email} onChange={(e)=>(setemail(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setpassword(e.target.value)
                    }}></Form.Control>
                </Form.Group>

        

                <Button variant="primary" type="submit" className="my-3">Sign In</Button>
                </Form>

                <p className="py-3">
                New Customer? <Link to={redirect?`/register?redirect=${redirect}`:"/register"} style={{textDecoration:"none"}}>Register</Link></p>
                {/* <Row className="py-3">
                    <Col>
                    New Customer? <Link to={redirect?`/register?redirect=${redirect}`:"/regitser"} style={{textDecoration:"none"}}>Register</Link></Col>    
                </Row> */}

                </>}
                
              
            </Formcontainer>
        
    )
}

export default Loginscreen
