import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import {details, update} from "../actions/useractions"
import { useState,useEffect } from 'react'
//import {Link} from "react-router-dom"
import {Table,Form,Button,Row,Col} from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listorder } from '../actions/orderactions'


const Profilescreen = ({history}) => {
    const dispatch=useDispatch()
    const [email,setemail]=useState("");
    const [name,setname]=useState("");
    const [password,setpassword]=useState("");
    const [confirmpassword,setconfirmpassword]=useState("");
    const [message,setmessage]=useState(null);

    const userdetails=useSelector((state)=>state.userdetails)
    const {loading,error,user}=userdetails
    const listmyorder=useSelector((state)=>state.listmyorder)
    const {loading:loadingorder,error:errororder,orders}=listmyorder
    const userlogin=useSelector((state)=>state.userlogin)
    const { userinfo }=userlogin
    const userupdate=useSelector((state)=>state.userupdate)
    const { success }=userupdate
    

    useEffect(()=>{
        if(!userinfo){//if user not logged in
            history.push("/login")
        }
        else{
            if(!user.name){
                dispatch(details())
                dispatch(listorder())
            }
                
            else{
                setname(user.name)
                setemail(user.email)
            }    
        }
            
    },[history,userinfo,dispatch,user])//the array here is known as dependancy array,useEffect gets executed whenever the elements in the dependancy array gets updated

    const submithandler=(e)=>{
        e.preventDefault()
        if(password!==confirmpassword)
        {
            setmessage("Passwords do not match")
        }
        else
        {
            dispatch(update({id:user._id,name,email,password}))        
        }    
    }

    return (
        <Row>
            <Col md="3">
                <h1>User Profile</h1>
                {message&&<Message variant="danger" children={message} />}
                {error&&<Message variant="danger" children={error} />}
                {success&&<Message variant="success">Profile Updated</Message>}
                {loading&&<Loader />}
                <Form onSubmit={submithandler}>
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
                    <Button variant="primary" type="submit" className="my-3">Update</Button>
                </Form>
            </Col>
            <Col md="9">
                <h2>Your Orders</h2>
                {loadingorder ? <Loader />:errororder ? <Message variant="danger" children={errororder} />:<Table striped bordered hover responsive className="table-sm">
                    {/*anytg with classname ending with "-sm" means it wld make it compact or small which means here "table-sm" makes the table compact with less white spacing in between, hover means when mouse pointer is kept on the table the color changes and responsive means if table width or breadth is large it automatically adds the scrollbar */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>{/*here substring is used to get only the first 10 charcaters */}
                                <td>{order.totalprice}</td>
                                <td>{order.ispaid?order.paidat.substring(0,10):<i className="fas fa-times" style={{color:"red"}}></i>}</td>
                                <td>{order.isdelivered?order.deliveredat.substring(0,10):<i className="fas fa-times" style={{color:"red"}}></i>}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant="light" className="btn-sm">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
                }
            </Col>
        </Row>
    )
}

export default Profilescreen
