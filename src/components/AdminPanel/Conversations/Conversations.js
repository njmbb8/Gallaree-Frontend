import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import ConversationList from "./ConversationList/ConversationList";
import Chat from "./Chat/Chat";
import { Container, Col, Row, Offcanvas } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "./Conversations.css"

function Conversations(){
    const {REACT_APP_BACKEND_URL} = process.env
    const [conversations, setConversations] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)
    const [showConvos, setShowConvos] = useState(false)

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/conversations`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((res)=>res.json())
        .then((data)=>setConversations(data))
    }, []) 

    useEffect(()=>{
        setShowConvos(false)
    }, [selectedChat])

    return(
            !!conversations ?
                <>
                    <div id="expand" className="fixed-top d-md-none" onClick={()=>setShowConvos(true)}>
                        <FaBars id="hamburger"/>
                    </div>
                    
                    <Offcanvas 
                        show={showConvos}
                        onHide={()=>setShowConvos(false)}
                        responsive="sm"
                        placement="start"
                        className="d-md-none"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Select a Conversation</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ConversationList 
                                conversations={conversations}
                                setSelectedChat={setSelectedChat}
                                selectedChat={selectedChat} 
                            />
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Container>
                        <Row sm={2}>
                            <Col className="d-none d-sm-block" >
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
                    </Container>
                </>
            :
                <TailSpin />
    )
}

export default Conversations