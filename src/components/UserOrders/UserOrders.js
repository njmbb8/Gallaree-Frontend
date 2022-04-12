import React from "react";
import UserOderListItem from "../UserOrderListItem/UserOrderListItem";
import { ListGroup, Row, Col } from "react-bootstrap";

function UserOrders({orders}){
    const orderItems = orders.map((order) => {
        return <UserOderListItem order={order}/>
    })

    return(
        <>
            <Row>
                <h2>Orders:</h2>
            </Row>
            <ListGroup>
                <ListGroup.Item>
                    <Col>
                        <h3>Order ID:</h3>
                    </Col>
                    <Col>
                        <h3>Address</h3>
                    </Col>
                    <Col>
                        <h3>Tracking #:</h3>
                    </Col>
                </ListGroup.Item>
                {orderItems}
            </ListGroup>
        </>
    )
}

export default UserOrders