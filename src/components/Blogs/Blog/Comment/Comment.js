import React from "react";
import { Card } from "react-bootstrap";

function Comment({comment}){
    return(
        <Card>
            <Card.Header>{`${comment.user.firstname} ${comment.user.lastname}`}</Card.Header>
            <Card.Body>
                <Card.Text>{comment.text}</Card.Text>
            </Card.Body>
            <Card.Footer>{`Created: ${comment.created_at}`}</Card.Footer>
        </Card>
    )
}

export default Comment