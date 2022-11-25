import React from "react";
import { Card, Col, Row } from "react-bootstrap";

function AddressCard({ address, setSelectedAddress}){
    function handleClick(){
        setSelectedAddress(address)
    }

    return(
        <Card onClick={handleClick}>
            <Card.Header>
                <Row>
                <Col>{`${address.line1} ${address.line2}`}</Col>
                {address.shipping? <Col>Shipping</Col> : null}
                {address.billing? <Col>Billing</Col> : null}
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>{`${address.city}, ${address.state}`}</Col>
                    <Col>{address.postal_code}</Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default AddressCard