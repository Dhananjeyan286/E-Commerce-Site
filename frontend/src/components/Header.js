import React from 'react'
import { Navbar,Nav,Container, NavDropdown } from 'react-bootstrap'
import { Link, Route } from 'react-router-dom'
import {LinkContainer} from "react-router-bootstrap"//used for wrapping a Link tag around bootstrap components,note we can use Link tag directly also as we have used around the tag Navbar.Brand
import {useDispatch,useSelector} from "react-redux"
import {logout} from "../actions/useractions"
import Searchbar from './Searchbar'

const Header = () => {

    const dispatch=useDispatch()

    const logininfo=useSelector((state)=>state.userlogin)
    const {userinfo}=logininfo

    const logouthandler=()=>{
        dispatch(logout())
        // dispatch()
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Link to="/" style={ {textDecoration:"none"}}>
                        <Navbar.Brand>U-Shop</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <Searchbar /> */}
                        {/*if u put ;ike this Searchbar directly we will get error stating history is not defined because history is passed as parameter nly in Searchbar component which is present inside this component and match,history all the props are valid only in the parent component tht is in the screens part alone tht is in the first component alone and not in the components which is placed inside the other component therefore we have to do it in the below way*/}
                        <Route render={({history})=><Searchbar history={history}/>}/>
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart me-1"></i>Cart</Nav.Link>
                            </LinkContainer>
                            {userinfo?<NavDropdown title={userinfo.name}  >
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logouthandler}>Logout</NavDropdown.Item>
                            </NavDropdown>:<LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user me-1"></i>Sign In</Nav.Link>
                            </LinkContainer>}
                            {userinfo && userinfo.isadmin && (
                               <NavDropdown title="Admin" >
                               <LinkContainer to="/admin/userlist">
                                   <NavDropdown.Item>Users</NavDropdown.Item>
                               </LinkContainer>
                               <LinkContainer to="/admin/productlist">
                                   <NavDropdown.Item>Products</NavDropdown.Item>
                               </LinkContainer>
                               <LinkContainer to="/admin/orderlist">
                                   <NavDropdown.Item>Orders</NavDropdown.Item>
                               </LinkContainer>
                           </NavDropdown> 
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
