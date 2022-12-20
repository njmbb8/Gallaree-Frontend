import React from "react";
import { Card } from "react-bootstrap";

function Message({message, sender}){

    return(
        <Card>
            <Card.Header>
                {sender.name}
            </Card.Header>
            <Card.Body>
                {message.body}
            </Card.Body>
            <Card.Footer>
                {`Read At: ${message.read}`}
            </Card.Footer>
        </Card>
    )
}

export default Message