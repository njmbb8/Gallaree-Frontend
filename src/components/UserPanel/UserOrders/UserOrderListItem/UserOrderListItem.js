import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserOderListItem({order, index}){
    const navigate = useNavigate()
    return (
        <Row 
            onClick={()=>navigate(`/order/${order.id}`)} 
            style={{"background-color": index%2?"":"whitesmoke"}}
            className="orderRow"
        >
            <Col className="d-none d-md-block">
                <p>{order.id}</p>
            </Col>
            <Col>
                <Row>
                    <p>{`${new Date(order.place_time).toLocaleDateString('en-US')}`}</p>
                </Row>
                <Row>
                    <p>{`${new Date(order.place_time).toLocaleTimeString('en-US')}`}</p>
                </Row>
            </Col>
            <Col>
                <Row>
                    <p>{`${order.shipping_address.line1} ${order.shipping_address.line2}`}</p>
                </Row>
                <Row>
                    <p>{`${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.postal_code}`}</p>
                </Row>
            </Col>
            <Col>
                <p>{order.status}</p>
            </Col>
            <Col>
                <p>{order.total_with_fee}</p>
            </Col>
        </Row>
    )
}

export default UserOderListItem