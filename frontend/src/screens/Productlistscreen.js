import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import {listproducts,deleteproduct} from "../actions/productactions"
import { useEffect } from 'react'
import {Table,Button,Row,Col} from "react-bootstrap"
//import { LinkContainer } from 'react-router-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from '../components/Paginate'


const Productlistscreen = ({history,match}) => {

    const pagenumber=match.params.pagenumber||1

    const dispatch=useDispatch()
    
    const productlist=useSelector((state)=>state.productlist)
    const {loading,error,products,pages,page}=productlist
    const userlogin=useSelector((state)=>state.userlogin)
    const {userinfo}=userlogin
    const productdelete=useSelector((state)=>state.productdelete)
    const {loading:loadingdelete,error:errordelete,success}=productdelete
    
    useEffect(()=>{
        if(userinfo && userinfo.isadmin)
        dispatch(listproducts("",pagenumber))
        else
        history.push("/login")
    },[dispatch,history,userinfo,success,pagenumber])//here deleteusersuccess is put in dependancy array because once an user is deleted the users list will get rendered again by removing tht user

    const deletehandler=(id)=>{
        if(window.confirm("Are you sure?"))//window.confirm generates a pop up if yes is clicked then user is deleted else if cancel is clicked nothing happens
        dispatch(deleteproduct(id))
    }

    const createproducthandler=()=>{
        history.push("/admin/product")
    }

    return (
        <>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end" >
                    <Button variant="primary" className="my-3" onClick={createproducthandler}>
                        <i className="fas fa-plus fa-x"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingdelete && <Loader />}
            {errordelete && <Message variant="danger" children={errordelete} />}
            {loading?<Loader />:error?<Message variant="danger" children={error} />:<><Table bordered striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td><a href={`/admin/product/${product._id}`}>
                                    <Button variant="light" className="btn-sm" style={{backgroundColor:"yellow",marginRight:"20px"}}>
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </a>
                                <Button variant="danger" className="btn-sm" onClick={()=> deletehandler(product._id)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td> 
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} isadmin={true} />
            </>}
        </>
    )
}

export default Productlistscreen
