import React, { useEffect, useState } from "react";
import UserOderListItem from "./UserOrderListItem/UserOrderListItem";
import { ListGroup, Row, Col } from "react-bootstrap";

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
                </ListGroup.Item>
                {orderItems}
            </ListGroup>
        </>
    )
}

export default UserOrders