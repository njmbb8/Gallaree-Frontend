import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

function AdminOrderItem({order}){
    const [tracking, setTracking] = useState(order.tracking)
    const {REACT_APP_BACKEND_URL} = process.env

    function shipOrder(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/orders/${order.id}`, {
            method: "POST",
            credentials: "include",
            headers:{
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({...order, tracking: tracking})
        })
    }

    return(
        <Row>
            <Col>
                <p>{order.id}</p>
            </Col>
            <Col>
                <p>{order.user.firstname} {order.user.lastname} </p>
            </Col>
            <Col>
                <p>{order.shipping_address}</p>
            </Col>
            <Col>
                <p>{order.status.name}</p>
            </Col>
            {!order.tracking?
                <Col>
                    <Form onSubmit={shipOrder}>
                        <Form.Control type="text" value={tracking} onChange={e => setTracking(e.target.value)}/>
                        <Button type="submit">ship</Button>
                    </Form>
                </Col>
            :
                <Col>
                    <p>{order.tracking}</p>
                </Col>
            }
        </Row>
    )
}

export default AdminOrderItem