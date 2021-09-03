import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const Paginate = ({pages,page,isadmin="",keyword=""}) => {
    return (
        pages>1 && (<Pagination>
            {[...Array(pages).keys()].map((x)=>(
                <LinkContainer key={x+1} to={!isadmin?keyword?`/search/${keyword}/page/${x+1}`:`/page/${x+1}`:`/admin/productlist/${x+1}`}>
                    <Pagination.Item active={x+1===page}>{x+1}</Pagination.Item>{/*active means to show the active page  */}
                </LinkContainer>
            ))}
        </Pagination>)
    )
}

export default Paginate
