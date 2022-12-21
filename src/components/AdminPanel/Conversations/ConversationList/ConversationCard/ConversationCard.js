import React from "react";
import { Card, Stack } from "react-bootstrap";

function ConversationCard({conversation, selectedChat, setSelectedChat}){
    return(
        <Card 
            onClick={()=>setSelectedChat(conversation.id)} 
            bg={conversation.id === selectedChat ? 'info' : 'light'}
        >
            <Card.Header>
                <Stack direction="horizontal">
                    <Card.Title>{`${conversation.sender_info.name}`}</Card.Title>
                    <p className="ms-auto">
                        {
                            conversation.last_message.first_fifteen === 'New conversation' ? 
                                `${conversation.created_at}`
                            :
                                `${conversation.last_message.created_at}`
                        }
                    </p>
                </Stack>
            </Card.Header>
            <Card.Body>{conversation.last_message.first_fifteen}</Card.Body>
        </Card>
    )
}

export default ConversationCard