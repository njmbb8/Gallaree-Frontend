import React from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";

function LoginAlert({message, variant}){
    const [show, setShow] = useState(true)
    return(
        <Alert
            show={show}
            onClose={()=>setShow(false)}
            variant={variant}
            dismissible
        >
            {message}
        </Alert>
    )
}

export default LoginAlert