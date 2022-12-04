import React from "react";
import UserOderListItem from "../UserOrderListItem/UserOrderListItem";
import { ListGroup, Row, Col } from "react-bootstrap";

function UserOrders({orders}){
    const orderItems = orders.map((order) => {
        return <UserOderListItem key={order.id} order={order}/>
    })

    return(
        <>
            <Row>
                <h2>Orders:</h2>
            </Row>
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>
                            <h5>Order ID:</h5>
                        </Col>
                        <Col>
                            <h5>Address</h5>
                        </Col>
                        <Col>
                            <h5>Tracking #:</h5>
                        </Col>
                    </Row>
                </ListGroup.Item>
                {orderItems}
            </ListGroup>
        </>
    )
}

export default UserOrders