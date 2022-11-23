import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { setError } from "../../slices/Error"
import { updateOrderItems } from "../../slices/Order"
import { useDispatch } from "react-redux";


function AdminOrderItem({order}){
    const [tracking, setTracking] = useState(order.tracking)
    const {REACT_APP_BACKEND_URL} = process.env
    const dispatch = useDispatch()

    function shipOrder(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/orders/${order.id}`, {
            method: "PATCH",
            credentials: "include",
            headers:{
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({...order, tracking: tracking})
        })
        .then((data) => {
            if(!data.ok){
                throw Error(data.json())
            }
            else{
                return data.json()
            }
        })
        .then((ret)=>{
            dispatch(updateOrderItems(ret))
        })
        .catch((error) => dispatch(setError(error)))

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
                <p>{`${order.shipping_address.city}, ${order.shipping_address.state}`}</p>
            </Col>
            <Col>
                <p>{order.status}</p>
            </Col>
            <Col>
                <p>${order.total_with_fee}</p>
            </Col>
        </Row>
    )
}

export default AdminOrderItem