import React from "react";
import { Card, Stack, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function MessageCard({message}){
    const user = useSelector(state => state.user)
    const fromUser = user.id === message.sender.id
    return(
        <Row>
            <Col
                sm={ fromUser ? 
                    {span: 3, offset: 6} : {span: 3, offset: 3}}
                md={ fromUser ?
                    {span: 4, offset: 3} : {offset: 5, span: 4}}    
            >
                <Card bg={fromUser?'info':'light'}>
                    <Card.Header >
                        <Stack direction="horizontal">
                            <div>{message.sender.name}</div>
                            <div className="ms-auto">{message.sender.email}</div>
                        </Stack>
                    </Card.Header>
                    <Card.Body>
                        {message.body}
                    </Card.Body>
                    <Card.Footer>
                        <Stack direction="horizontal">
                            <div>{`Sent: ${new Date(message.created_at).toLocaleString()}`}</div>
                            <div className="ms-auto">{!!message.read?'Read':'Unread'}</div>
                        </Stack>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default MessageCard