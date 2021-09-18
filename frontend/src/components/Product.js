import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Ratings from "./Ratings"

const Product = ({product}) => {
    return (
        <Card className="py-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>{/*Link tag used over a tag because Link tag reloads the pages faster than a tag */}
            
            <Card.Body>
                <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
                    <Card.Title as="div">
                        {product.name}
                    </Card.Title>
                </Link>

                <Card.Text as="div" className="my-3">
                    <Ratings value={product.rating}/> from {product.numReviews} {product.numReviews>1?"reviews":"review"}
                </Card.Text>

                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
