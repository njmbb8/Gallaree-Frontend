import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

function MessageForm({setConversation}){
    const {REACT_APP_BACKEND_URL} = process.env
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    function handleSubmit(e){
        e.preventDefault()
        if(!message || message.length === 0){
            setError("You can't send an empty message")
        }
        else{
            fetch(`${REACT_APP_BACKEND_URL}/conversations/send`, {
                method: 'put',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({body: message})
            })
            .then((data)=>{
                if(data.ok){
                    return data.json()
                }
            })
            .then((ret)=>{
                setConversation(ret)
                setMessage('')
            })
        }
    }

    return(
        <Form className="fixed-bottom" onSubmit={handleSubmit}>
            <InputGroup>
                <Form.Control
                    as="textarea"
                    value={message}
                    onChange={e=>setMessage(e.target.value)}
                    aria-describedby="submit-button"
                    isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
                <Button id="submit-button" type="submit">Send</Button>
            </InputGroup>
        </Form>
    )
}

export default MessageForm