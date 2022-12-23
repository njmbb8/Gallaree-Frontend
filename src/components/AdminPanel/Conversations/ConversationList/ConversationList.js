import React from "react";
import { Stack } from "react-bootstrap";
import ConversationCard from "./ConversationCard/ConversationCard";
import "./ConversationList.css"

function ConversationList({conversations, setSelectedChat, selectedChat}){
    const conversationCards = conversations.map((conversation)=><ConversationCard 
                                                                    key={conversation.id} 
                                                                    conversation={conversation}
                                                                    setSelectedChat={setSelectedChat}
                                                                    selectedChat={selectedChat}
                                                                    />)

    return(
        <>
            <Stack direction="vertical" gap={3} id="conversations">
                {conversationCards}
            </Stack>
        </>
    )
}

export default ConversationList