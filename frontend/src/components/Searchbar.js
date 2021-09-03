import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'

const Searchbar = ({history}) => {

    const [keyword,setkeyword]=useState("")

    const submithandler=(e)=>{
        e.preventDefault()
        if(keyword.trim())
            history.push(`/search/${keyword}`)
        else
            history.push("/")    
    }

    return (
        <Form onSubmit={submithandler} style={{display:"inherit"}}>
            <Form.Control type="text" onChange={((e)=>setkeyword(e.target.value))} value={keyword} placeholder="Search products..." className="me-2"></Form.Control>
            <Button type="submit" variant="outline-success" className="p-2" >
                Search
            </Button>
            {/*p-2 represents padding and outline-success gives a green color outline for the button */}
        </Form>
    )
}

export default Searchbar
