import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

function Confirmation(){
    const params = useParams()
    const [ success, setSuccess ] = useState(false)
    const [ errorText, setErrorText ] = useState('')
    const [ render, setRender ] = useState(false)
    const { REACT_APP_BACKEND_URL } = process.env
    
    useEffect(()=>{

        const formData = new FormData()
        formData.append('token', params['token'])
        fetch(`${REACT_APP_BACKEND_URL}/confirmation/`,
        {
            method: 'PATCH',
            body: formData
        })
        .then((data) => {
            if(!data.ok){
                throw Error(data.json())
            }
        })
        .then(() => {
            setSuccess(true)
            setRender(true)
        })
        .catch((data) => {
            setErrorText(data.error)
            setRender(true)
        })
    }, [REACT_APP_BACKEND_URL, params])

    return (
        <>
            {render?
            <Card>
                <Card.Header>
                    Registration Confirmation
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        Your confirmation {success ? " was successful" : "failed"}
                    </Card.Title>
                    {!success ? <Card.Text>
                        {errorText}
                    </Card.Text>:
                    null}
                </Card.Body>
            </Card>
        :null}
        </>
    )
}

export default Confirmation