import React from "react"
import { BrowserRouter as Router,Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from "react-bootstrap"//first use npm i react-bootstrap and then use these
import Homescreen from "./screens/Homescreen"
import Productscreen from "./screens/Productscreen"
import Cartscreen from "./screens/Cartscreen"
import Loginscreen from "./screens/Loginscreen"
import Registerscreen from "./screens/Registerscreen"

const App=(()=> {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container >
                <Route path="/register" component={Registerscreen} />
                    <Route path="/login" component={Loginscreen} />
                    <Route path="/product/:id" component={Productscreen} />
                    <Route path="/cart/:id?" component={Cartscreen} />{/*here we use question mark near id because id is optional ,that is if we click buy now button in any product then it will go to cart screen with id as one of the parameter but if we simply click cart in the navbar then id will not be present as one of the parameter */}
                    <Route path="/" exact component={Homescreen} />
                </Container>
            </main>
            <Footer />    
        </Router>
    );
})

export default App;
