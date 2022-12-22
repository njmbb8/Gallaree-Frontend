import React, { useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import MessageCard from "./MessageCard/MessageCard";
import MessageForm from "./MessageForm/MessageForm";

function MessagesPanel(){
    const [conversation, setConversation] = useState()
    const {REACT_APP_BACKEND_URL} = process.env
    const bottomRef = useRef(null)

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/conversations/show`, {
            method: 'GET',
            credentials: 'include'
        })
        .then((data)=>{
            if(data.ok){
                return data.json()
            }
        })
        .then((ret)=>setConversation(ret))
    }, [])

    useEffect(() => {
        bottomRef.current.scrollIntoView({behavior: 'smooth'})
    })

    const messageCards = !!conversation ? conversation.messages.map((message)=><MessageCard key={message.id} message={message} />) : null

    return(
        <>
            <Stack direction="vertical" gap={3}>
                {messageCards}
            </Stack>
            <MessageForm setConversation={setConversation} />
            <div ref={bottomRef}/>
        </>
    )
}

export default MessagesPanel