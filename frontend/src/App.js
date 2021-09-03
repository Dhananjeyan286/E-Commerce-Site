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
import Profilescreen from "./screens/Profilescreen"
import Shippingscreen from "./screens/Shippingscreen"
import Paymentscreen from "./screens/Paymentscreen"
import Placeorderscreen from "./screens/Placeorderscreen"
import Orderscreen from "./screens/Orderscreen"
import Userlistscreen from "./screens/Userlistscreen"
import Edituserscreen from "./screens/Edituserscreen"
import Productlistscreen from "./screens/Productlistscreen"
import Createproductscreen from "./screens/Createproductscreen"
import Orderlistscreen from "./screens/Orderlistscreen"

const App=(()=> {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container >
                    <Route path="/shipping" component={Shippingscreen} />
                    <Route path="/order/:id" component={Orderscreen} />
                    <Route path="/placeorder" component={Placeorderscreen} />
                    <Route path="/payment" component={Paymentscreen} />
                    <Route path="/profile" component={Profilescreen} />
                    <Route path="/register" component={Registerscreen} />
                    <Route path="/login" component={Loginscreen} />
                    <Route path="/admin/userlist" component={Userlistscreen} />
                    <Route path="/admin/product/:id?" component={Createproductscreen} />
                    <Route path="/admin/user/:id/edit" component={Edituserscreen} />
                    <Route path="/admin/productlist" component={Productlistscreen} exact/>
                    <Route path="/admin/productlist/:pagenumber" component={Productlistscreen} />
                    <Route path="/admin/orderlist" component={Orderlistscreen} />
                    <Route path="/product/:id" component={Productscreen} />
                    <Route path="/cart/:id?" component={Cartscreen} />{/*here we use question mark near id because id is optional ,that is if we click buy now button in any product then it will go to cart screen with id as one of the parameter but if we simply click cart in the navbar then id will not be present as one of the parameter */}
                    <Route path="/search/:keyword" component={Homescreen} exact/>
                    <Route path="/page/:pagenumber" component={Homescreen} />
                    <Route path="/search/:keyword/page/:pagenumber" component={Homescreen} />
                    <Route path="/" exact component={Homescreen} />
                </Container>
            </main>
            <Footer />    
        </Router>
    );
})

export default App;
