import React, { useState } from "react";
import { Col, Row, Image, Button, ListGroup, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateOrderItems } from "../../slices/Order";

function OrderItem({art, orderItem}){
    const { REACT_APP_BACKEND_URL } = process.env
    const dispatch = useDispatch()
    const [ quantity, setQuantity ] = useState(orderItem.quantity)

    function remove(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/order_items/${orderItem.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then((data)=>(data).json())
        .then((order)=> dispatch(updateOrderItems(order)))
    }

    function update(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/order_items/${orderItem.id}`, {
            method: 'PATCH',
            credentials: 'include',
            body:{
                quantity: quantity
            }
        })
        .then((data) => data.json())
        .then((ret) => dispatch(updateOrderItems(ret)))
    }
    return(
        <>
            <ListGroup.Item>
                <Row>
                    <Col>
                        <Image thumbnail={true} src={`${REACT_APP_BACKEND_URL }${art.photo}`} />
                    </Col>
                    <Col>
                        <p>{ art.title }</p>
                    </Col>
                    <Col>
                         <Form.Control type="text" onChange={(e) => setQuantity(e.target.value)}/>
                         {orderItem.quantity !== quantity ? <Button onClick={update}>Update</Button> : null}
                    </Col>
                    <Col>
                        <p>{ art.price }</p>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={remove}>Remove</Button>
                    </Col>
                </Row>
            </ListGroup.Item>
        </>
    )
}

export default OrderItem