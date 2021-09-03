import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form,Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Formcontainer from "../components/Formcontainer"
import { listproductdetails,createproduct } from '../actions/productactions'
import { PRODUCT_CREATE_RESET } from '../constants/productconstants'
import axios from "axios"

const Createproductscreen = ({match,history}) => {
    const productid=match.params.id

    const dispatch=useDispatch()

    const [price,setprice]=useState(0);//mark it as 0 or in useState() initially u need to give it some value u shld not leave it as undefined for string input give it initially as an empty string for number input give it some number such as 0 or 1 else it will show error
    const [name,setname]=useState("");
    const [description,setdescription]=useState("");
    const [image,setimage]=useState("");
    const [brand,setbrand]=useState("");
    const [category,setcategory]=useState("");
    const [countInStock,setcountInStock]=useState(0);
    const [numReviews,setnumReviews]=useState(0);
    const [uploading,setuploading]=useState(false);
    const [message,setmessage]=useState("")

    const productdetails=useSelector((state)=>state.productdetails)
    const {loading:prodloading,error:proderror,product:prodproduct}=productdetails

    const productcreate=useSelector((state)=>state.productcreate)
    const {loading,error,success}=productcreate

    
    

    useEffect(()=>{
        if(success)
        {
            dispatch({type:PRODUCT_CREATE_RESET})
            history.push("/admin/productlist")
        }
            
        else{
            if(productid)
            {
                
                if(!prodproduct.name)
                {
                    //console.log(match.params.id)
                    
                    dispatch(listproductdetails(productid))
                }
                    

                else{
                    
                    setprice(prodproduct.price)
                    setname(prodproduct.name)
                    setdescription(prodproduct.description)
                    //console.log(prodproduct.description)
                    setimage(prodproduct.image)
                    setbrand(prodproduct.brand)
                    setcategory(prodproduct.category)
                    setcountInStock(prodproduct.countInStock)
                    setnumReviews(prodproduct.numReviews)
                }
            }
        }    
            
    },[prodproduct,dispatch,productid,history,success,match,])//the array here is known as dependancy array,useEffect gets executed whenever the elements in the dependancy array gets updated

    const submithandler=(e)=>{
        e.preventDefault()
        if(productid)
        dispatch(createproduct(productid,{name,brand,category,description,price,numReviews,countInStock,image}))
        else    
        dispatch(createproduct("0",{name,brand,category,description,price,numReviews,countInStock,image}))
    }

    const uploadfilehandler=async(e)=>{
        const file=e.target.files[0]//here in browser we wld be able to upload multiple files in general and all these files will be stored in the object e.target.files as an array here since we are uploading only one file we put e.target.files[0]
        const formdata=new FormData()//we can add values from forms in the form of key-value pair, here first we are creatung an empty FormData() constructor
        formdata.append("image",file)
        setuploading(true)

        try{
            const config={
                headers:{
                    "Content-Type":"multipart/form-data"//this is the content type for uploading images
                }
            }

            const {data}=await axios.post("/api/upload",formdata,config)
            //console.log(data)
            setimage(data)
            setuploading(false)
        
        }
        catch(error){
            console.log(error)
            setmessage("Only jpg,jpeg,png formats are allowed")
            setuploading(false)
        }


    }

    return (
            <Formcontainer>
            <Button variant="primary" ><Link to="/admin/productlist" style={{color:"white",textDecoration:"none"}}>Go Back</Link></Button>
            {productid?<h1>Edit Product</h1>:<h1>Create Product</h1>}
            {prodloading && <Loader />}
            {proderror && <Message variant="danger" children={proderror} />}
            {loading&&<Loader />}
            {error&&<Message variant="danger" children={error} />}
            {<><Form onSubmit={submithandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"  value={name} placeholder="Enter the product name" onChange={(e)=>(setname(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Enter the brand name"  value={brand} onChange={(e)=>(setbrand(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter the price of the product" value={price} onChange={(e)=>(setprice(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter which category does the product belong to" value={category} onChange={(e)=>(setcategory(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter the description about the product"  value={description} onChange={(e)=>(setdescription(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="numReviews">
                    <Form.Label>Number of reviews</Form.Label>
                    <Form.Control type="number" placeholder="Enter the number of reviews" value={numReviews} onChange={(e)=>(setnumReviews(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="countInStock">
                    <Form.Label>Count in stock</Form.Label>
                    <Form.Control type="number"  value={countInStock} placeholder="Enter the count in stock" className={message?"mb-3":""} onChange={(e)=>(setcountInStock(e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId="image">
                    {message && <Message variant="danger" children={message} />}  
                    {/* {setmessage("")} */}
                    <Form.Label style={{"display":"block"}}>Image</Form.Label>
                    <Form.Control type="text" placeholder="Enter the location of the product or upload a photo" className="mb-3" value={image} onChange={(e)=>(setimage(e.target.value))}></Form.Control>
                    <Form.Control  type="file"  label="Choose File"  onChange={uploadfilehandler} ></Form.Control>
                    {uploading && <Loader />}
                </Form.Group>


                <Button variant="primary" type="submit" className="my-3">{productid?"Update":"Create"}</Button>
                </Form>
                </>}
            </Formcontainer>        
            
                
              
            
        
    )
}

export default Createproductscreen
