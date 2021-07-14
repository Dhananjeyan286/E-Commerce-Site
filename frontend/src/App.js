import React from "react"
import { BrowserRouter as Router,Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from "react-bootstrap"//first use npm i react-bootstrap and then use these
import Homescreen from "./screens/Homescreen"
import Productscreen from "./screens/Productscreen"

const App=(()=> {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container >
                    <Route path="/" exact component={Homescreen} />
                    <Route path="/product/:id" component={Productscreen} />
                </Container>
            </main>
            <Footer />    
        </Router>
    );
})

export default App;
