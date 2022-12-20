import React, { useEffect, useState } from "react";
import { Container, Form, InputGroup, Stack, Button } from "react-bootstrap";
import Message from "./Message/Message";

function Chat({selectedChat, setSelectedChat}){
    const [currentChat, setCurrentChat] = useState(null)
    const {REACT_APP_BACKEND_URL} = process.env
    const [newMessage, setNewMessage] = useState('')

    useEffect(()=>{
        if(selectedChat){
            fetch(`${REACT_APP_BACKEND_URL}/conversations/${selectedChat}`, {
                method: 'GET',
                credentials: 'include'
            })
            .then((res)=>res.json())
            .then((data)=>setCurrentChat(data))
        }
    }, [selectedChat])

    function handleSubmit(e){
        e.preventDefault()

        fetch(`${REACT_APP_BACKEND_URL}/conversations/${selectedChat}`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({body: newMessage})
        })
        .then((data)=>{
            if(data.ok){
                return data.json()
            }
        })
        .then((res)=>{
            setCurrentChat(res)
        })
    }

    const messages = currentChat ? currentChat.messages.map((message)=><Message key={message.id} message={message} sender={currentChat.sender}/>) : null

    return(
        <>
            <Container>
                <Stack direction="vertical" gap={3}>
                    {messages}
                </Stack>
            </Container>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control
                        as="textarea"
                        value={newMessage}
                        onChange={e=>setNewMessage(e.target.value)}
                        aria-describedby="submit-button"
                    />
                    <Button id="submit-button" type="submit">Send</Button>
                </InputGroup>
            </Form>
        </>
    )
}

export default Chat