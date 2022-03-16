import React from "react";
import { Col, Row, Image, Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateOrderItems } from "../../slices/Order";

function OrderItem({orderItem}){
    const { REACT_APP_BACKEND_URL } = process.env
    const dispatch = useDispatch()

    function remove(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/${orderItem.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then((order)=> dispatch(updateOrderItems(order)))
    }

    return(
        <>
            <ListGroup.Item>
                    <Row>
                    <Col>
                        <Image thumbnail={true} src={`${REACT_APP_BACKEND_URL }${orderItem.photo}`} />
                    </Col>
                    <Col>
                        <p>{ orderItem.title }</p>
                    </Col>
                    <Col>
                        <p>{ orderItem.price }</p>
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