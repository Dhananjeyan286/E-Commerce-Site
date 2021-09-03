import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form,Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {userget,userupdate} from "../actions/useractions"
import Formcontainer from "../components/Formcontainer"
import { USER_UPDATE_RESET } from '../constants/userconstants'

const Edituserscreen = ({match,history}) => {
    const userid=match.params.id

    const [email,setemail]=useState("");
    const [name,setname]=useState("");
    const [isadmin,setisadmin]=useState(false);
    

    const dispatch=useDispatch()

    const getuser=useSelector((state)=>state.getuser)
    const {loading,error,user}=getuser
    const updateuser=useSelector((state)=>state.updateuser)
    const {loading:loadingupdated,error:errorupdated,success:successupdated}=updateuser
    

    useEffect(()=>{
        if(successupdated)
        {
            dispatch({type:USER_UPDATE_RESET})
            history.push("/admin/userlist")
        }
            
        else{
            if( !user.name || user._id !==userid){//we are checking user.name is there or not if it is there then we go to else if it is not there then we go into the if statement and we are also checking if the userdetails.id nd the id in the parameter is same or not if it is same we go to else if it is not same we go within the if statement ,note here we are not checking whether user is there or not we are checking user.name is there or not because of the fact tht in in userdetailsreducer we have initially declared user as an empty object which means user object will always be present and user.name will be present once the details() action is fired off
                dispatch(userget(userid))
            }
            else{
                setname(user.name)
                setemail(user.email)
                setisadmin(user.isadmin)
            }
        }    
            
    },[user,dispatch,userid,history,successupdated])//the array here is known as dependancy array,useEffect gets executed whenever the elements in the dependancy array gets updated

    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(userupdate({_id:userid,name,email,isadmin}))    
    }

    return (
            <Formcontainer>
            <Button variant="primary" ><Link to="/admin/userlist" style={{color:"white",textDecoration:"none"}}>Go Back</Link></Button>
            <h1>Edit User</h1>
            {loadingupdated && <Loader />}
            {errorupdated && <Message variant="danger" children={errorupdated} />}
            {loading?<Loader />:error?<Message variant="danger" children={error} />:<><Form onSubmit={submithandler}>
            <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e)=>(setname(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email ID" value={email} onChange={(e)=>(setemail(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="isadmin" className="my-3">
                    <Form.Check type="checkbox" label="Is Admin" checked={isadmin} onChange={(e)=>{setisadmin(e.target.checked)
                    }}></Form.Check>
                </Form.Group>

                <Button variant="primary" type="submit" className="my-3">Update</Button>
                </Form>
                </>}
            </Formcontainer>        
            
                
              
            
        
    )
}

export default Edituserscreen
