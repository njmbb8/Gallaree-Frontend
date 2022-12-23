import React from "react";
import { Card, Col, Stack, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function Message({message}){
    const user = useSelector(state=>state.user)  
    const fromUser = user.id === message.sender.id

    return(
        <Row>
            <Col
                md={ fromUser ?
                    {span: 6, offset: 6} : {span: 6, offset: 0}}  
            >
                <Card bg={fromUser ? 'info' : 'light'}>
                    <Card.Header>
                        <Stack direction="horizontal">
                            {message.sender.name}
                            <div className="ms-auto">{message.sender.email?message.sender.email:message.sender.phone}</div>
                        </Stack>
                    </Card.Header>
                    <Card.Body>
                        {message.body}
                    </Card.Body>
                    <Card.Footer>
                        <Stack direction="horizontal">
                            {new Date(message.created_at).toLocaleString()}
                            <div className="ms-auto">{!!message.read?'Read':'Unread'}</div>
                        </Stack>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default Message