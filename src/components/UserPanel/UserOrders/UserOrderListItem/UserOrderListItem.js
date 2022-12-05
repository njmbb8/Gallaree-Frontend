import React from "react";
import { ListGroupItem, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserOderListItem({order}){
    const navigate = useNavigate()
    return (
        <ListGroupItem onClick={()=>navigate(`/order/${order.id}`)}>
            <Row>
                <Col>
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
        </ListGroupItem>
    )
}

export default UserOderListItem