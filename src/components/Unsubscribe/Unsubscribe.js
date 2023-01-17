import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

function Unsubscribe(){
    const {REACT_APP_BACKEND_URL} = process.env
    const params = useParams()
    const [unsubscribed, setUnsubscribe]= useState(false)

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/unsubscribe/${params['token']}`, {
            method: 'PATCH',
            credentials: 'include',
        })
        .then((data)=>{
            if(data.ok){
                setUnsubscribe(true)
            }
        })
    }, [])

    return(
        <Container className="mt-5" >
            {
                unsubscribed?
                    <h2>You have been unsubscribed successfully.</h2>
                :
                    <h2>An error appears to have occurred while unsubscribing you. Please try again in a few minutes</h2>
            }
        </Container>
    )
}

export default Unsubscribe