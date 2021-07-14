import React from 'react'

const Ratings = ({value}) => {
    return (
        <>
            <span><i style={{color:"yellow"}}className={value>=1?"fas fa-star":value>0.49?"fas fa-star-half-alt":"far fa-star"}></i></span>
            <span><i style={{color:"yellow"}} className={value>=2?"fas fa-star":value>1.49?"fas fa-star-half-alt":"far fa-star"}></i></span>
            <span><i style={{color:"yellow"}} className={value>=3?"fas fa-star":value>2.49?"fas fa-star-half-alt":"far fa-star"}></i></span>
            <span><i style={{color:"yellow"}} className={value>=4?"fas fa-star":value>3.49?"fas fa-star-half-alt":"far fa-star"}></i></span>
            <span><i style={{color:"yellow"}} className={value>=5?"fas fa-star":value>4.49?"fas fa-star-half-alt":"far fa-star"}></i></span>
        </>
    )
}

export default Ratings
