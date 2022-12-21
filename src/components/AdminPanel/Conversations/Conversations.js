import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import ConversationList from "./ConversationList/ConversationList";
import Chat from "./Chat/Chat";
import { Col, Row } from "react-bootstrap";

function Conversations(){
    const {REACT_APP_BACKEND_URL} = process.env
    const [conversations, setConversations] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/conversations`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((res)=>res.json())
        .then((data)=>setConversations(data))
    }, []) 

    return(
            !!conversations ?
                <Row>
                    <Col>
                        <ConversationList 
                            conversations={conversations}
                            setSelectedChat={setSelectedChat}
                            selectedChat={selectedChat} 
                        />
                    </Col>
                    <Col>
                        <Chat
                            selectedChat={selectedChat}
                        />
                    </Col>
                </Row>
            :
                <TailSpin />
    )
}

export default Conversations