import React from 'react'
import { Alert } from 'react-bootstrap'
const Message = ({variant,children}) => {//children is nothing but the message present within the opening and closing tags of this component that is <Message></Message> or else pass the children normally as props
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

Message.defaultProps={
    variant:"info"//blue colour
}

export default Message
