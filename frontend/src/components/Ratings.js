import React from 'react'

const Ratings = ({value}) => {
    return (
        // <>
        //     <span><i style={{color:"yellow"}}className={value>=1?"fas fa-star":value>0.49?"fas fa-star-half-alt":"far fa-star"}></i></span>
        //     <span><i style={{color:"yellow"}} className={value>=2?"fas fa-star":value>1.49?"fas fa-star-half-alt":"far fa-star"}></i></span>
        //     <span><i style={{color:"yellow"}} className={value>=3?"fas fa-star":value>2.49?"fas fa-star-half-alt":"far fa-star"}></i></span>
        //     <span><i style={{color:"yellow"}} className={value>=4?"fas fa-star":value>3.49?"fas fa-star-half-alt":"far fa-star"}></i></span>
        //     <span><i style={{color:"yellow"}} className={value>=5?"fas fa-star":value>4.49?"fas fa-star-half-alt":"far fa-star"}></i></span>
        // </>
        <>
        {[...Array(5).keys()].map((x)=>{//here ...Array(product.countInStock).keys() is used to get an array like [0,1,2,3,4] based on the parameter value
            let a=x+1
            return <span key={a}><i style={{color:"yellow"}}className={value>=a?"fas fa-star":value>(a-0.51)?"fas fa-star-half-alt":"far fa-star"}></i></span>
            // if(value>=a)
            // return <span><i style={{color:"yellow"}}className="fas fa-star"></i></span>
            // else if(value>(a-0.51))
            // return <span><i style={{color:"yellow"}}className="fas fa-star-half-alt"></i></span>
            // else
            // return <span><i style={{color:"yellow"}}className="far fa-star"></i></span>
        })}
        </>
    )
}

export default Ratings
