import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form,Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {register} from "../actions/useractions"
import Formcontainer from "../components/Formcontainer"

const Registerscreen = ({location,history}) => {
    const [email,setemail]=useState("");
    const [name,setname]=useState("");
    const [password,setpassword]=useState("");
    const [confirmpassword,setconfirmpassword]=useState("");
    const [message,setmessage]=useState(null);

    const dispatch=useDispatch()

    const userregister=useSelector((state)=>state.userregister)
    const {loading,error,userinfo}=userregister

    const redirect=location.search?`/${location.search.split("=")[1]}`:"/"

    useEffect(()=>{
        if(userinfo)
        {
            history.push(redirect)
        }
    },[history,userinfo,redirect])//the array here is known as dependancy array,useEffect gets executed whenever the elements in the dependancy array gets updated

    const submithandler=(e)=>{
        e.preventDefault()
        if(password!==confirmpassword)
        {
            setmessage("Passwords do not match")
        }
        else
        {
            dispatch(register(name,email,password))
            history.push("/")
        }    
    }

    return (
            <Formcontainer>
            <h1>Sign Up</h1>
            {message&&<Message variant="danger" children={message} />}
            {error&&<Message variant="danger" children={error} />}
            {loading&&<Loader />}
            <><Form onSubmit={submithandler}>
            <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e)=>(setname(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email ID" value={email} onChange={(e)=>(setemail(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setpassword(e.target.value)
                    }}></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password" value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)
                    }}></Form.Control>
                </Form.Group>

        

                <Button variant="primary" type="submit" className="my-3">Register</Button>
                </Form>

                <p className="py-3">
                Have an Account? <Link to={redirect?`/login?redirect=${redirect}`:"/login"} style={{textDecoration:"none"}}>Sign In</Link></p>
                {/* <Row className="py-3">
                    <Col>
                    New Customer? <Link to={redirect?`/register?redirect=${redirect}`:"/regitser"} style={{textDecoration:"none"}}>Register</Link></Col>    
                </Row> */}

                </>
                
              
            </Formcontainer>
        
    )
}

export default Registerscreen
