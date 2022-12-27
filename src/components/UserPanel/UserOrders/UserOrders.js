import React, { useEffect, useState } from "react";
import UserOderListItem from "./UserOrderListItem/UserOrderListItem";
import { Row, Col, Container } from "react-bootstrap";

function UserOrders(){
    const { REACT_APP_BACKEND_URL } = process.env
    const [orders, setOrders] = useState([])
    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/order`, {
            method: 'GET',
            credentials: 'include'
        })
        .then((ret)=>ret.json())
        .then((data)=>{
            setOrders(data)
        })
    }, [REACT_APP_BACKEND_URL])

    const orderItems = orders.map((order, index) => {
        return <UserOderListItem key={order.id} order={order} index={index}/>
    })

    return(
        <Container id="orderList">
            <h2>Orders:</h2>
            <Row>
                <Col className="d-none d-md-block">
                    <h5>Order #:</h5>
                </Col>
                <Col>
                    <h5>Order Placed At:</h5>
                </Col>
                <Col>
                    <h5>Address:</h5>
                </Col>
                <Col>
                    <h5>Status:</h5>
                </Col>
                <Col>
                    <h5>Total:</h5>
                </Col>
            </Row>
            {orderItems}
        </Container>
    )
}

export default UserOrders