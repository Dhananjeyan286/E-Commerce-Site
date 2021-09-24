import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import {listuser, userdelete} from "../actions/useractions"
import { useEffect } from 'react'
import {Table,Button} from "react-bootstrap"
//import { LinkContainer } from 'react-router-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"


const Userlistscreen = ({history}) => {
    const dispatch=useDispatch()
    
    const userlist=useSelector((state)=>state.userlist)
    const {loading,error,users}=userlist
    const userlogin=useSelector((state)=>state.userlogin)
    const {userinfo}=userlogin
    const deleteuser=useSelector((state)=>state.deleteuser)
    const {success:deleteusersuccess}=deleteuser
    
    useEffect(()=>{
        if(userinfo && userinfo.isadmin)
        dispatch(listuser())
        else
        history.push("/login")
    },[dispatch,history,userinfo,deleteusersuccess])//here deleteusersuccess is put in dependancy array because once an user is deleted the users list will get rendered again by removing tht user

    const deletehandler=(id)=>{
        if(window.confirm("Are you sure?"))//window.confirm generates a pop up if yes is clicked then user is deleted else if cancel is clicked nothing happens
        dispatch(userdelete(id))
    }

    return (
        <>
            <h1>Users</h1>
            {loading?<Loader />:error?<Message variant="danger" children={error} />:<Table bordered striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`} style={{textDecoration:"none"}}>{user.email}</a></td>{/*here `mailto:${user.email}` directly opens the email website and you can mail them anytg */}
                            <td>{user.isadmin?(<i className="fas fa-check" style={{color:"green"}}></i>):(<i className="fas fa-times" style={{color:"red"}}></i>)}</td>
                            <td><a href={`/admin/user/${user._id}/edit`}>
                                    <Button variant="light" className="btn-sm" style={{backgroundColor:"yellow",marginRight:"20px"}}>
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </a>
                                <Button variant="danger" className="btn-sm" onClick={()=> deletehandler(user._id)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td> 
                        </tr>
                    ))}
                </tbody>
            </Table>}
        </>
    )
}

export default Userlistscreen
