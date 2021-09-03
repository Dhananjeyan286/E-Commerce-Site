import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from 'react'
import {Table,Button} from "react-bootstrap"
//import { LinkContainer } from 'react-router-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listallorder } from '../actions/orderactions'


const Orderlistscreen = ({history}) => {
    const dispatch=useDispatch()
    
    const listorder=useSelector((state)=>state.listorder)
    const {loading,error,orders}=listorder
    const userlogin=useSelector((state)=>state.userlogin)
    const {userinfo}=userlogin
    
    useEffect(()=>{
        if(userinfo && userinfo.isadmin)
        dispatch(listallorder())
        else
        history.push("/login")
    },[dispatch,history,userinfo])//here deleteusersuccess is put in dependancy array because once an user is deleted the users list will get rendered again by removing tht user


    return (
        <>
            <h1>Orders</h1>
            {loading?<Loader />:error?<Message variant="danger" children={error} />:<Table bordered striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalprice}</td>
                            <td>{order.ispaid?order.paidat.substring(0,10):(<i className="fas fa-times" style={{color:"red"}}></i>)}</td>
                            <td>{order.isdelivered?order.deliveredat.substring(0,10):(<i className="fas fa-times" style={{color:"red"}}></i>)}</td>
                            <td><a href={`/order/${order._id}`}>
                                    <Button variant="light" className="btn-sm" style={{backgroundColor:"black",color:"white",marginRight:"20px"}}>
                                        Details
                                    </Button>
                                </a>
                            </td> 
                        </tr>
                    ))}
                </tbody>
            </Table>}
        </>
    )
}

export default Orderlistscreen
