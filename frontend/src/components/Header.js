import React from 'react'
import { Navbar,Nav,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {LinkContainer} from "react-router-bootstrap"//used for wrapping a Link tag around bootstrap components,note we can use Link tag directly also as we have used around the tag Navbar.Brand

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Link to="/" style={ {textDecoration:"none"}}>
                        <Navbar.Brand>U-Shop</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart me-1"></i>Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user me-1"></i>Sign In</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
