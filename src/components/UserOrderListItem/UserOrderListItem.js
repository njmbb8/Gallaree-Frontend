import React from "react";
import { ListGroupItem, Col, Row } from "react-bootstrap";

function UserOderListItem({order}){
    return (
        <ListGroupItem>
            <Row>
                <Col>
                    <p>{order.id}</p>
                </Col>
                <Col>
                    <p>{order.address.address_line1}</p>
                </Col>
                <Col>
                    <p>{order.tracking}</p>
                </Col>
            </Row>
        </ListGroupItem>
    )
}

export default UserOderListItem