import React, { useState } from "react";
import { Col, Row, Image, Button, ListGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../slices/User";

function OrderItem({art, orderItem, mode}){
    const { REACT_APP_BACKEND_URL } = process.env
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [ quantity, setQuantity ] = useState(orderItem.quantity)

    function remove(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/order_items/${orderItem.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(()=>{
            dispatch(authenticate({...user, active_order: {...user.active_order, order_items: user.active_order.order_items.filter((item) => item.id !== orderItem.id)}}))
        })
    }

    function update(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/order_items/${orderItem.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                quantity: quantity
            })
        })
        .then((data) => data.json())
        .then((ret) => {
            dispatch(authenticate({
                ...user, 
                active_order: {
                    ...user.active_order, 
                    order_items: user.active_order.order_items.map((item)=>item.id===ret.id ? ret : item)
                }
            }))
            setQuantity(ret.quantity)
        })
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
                    {mode === "order" ? 
                        <>
                            <Col>
                                <Form.Control type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                                {orderItem.quantity !== quantity ? <Button onClick={update}>Update</Button> : null}
                            </Col>
                            <Col>
                                <p>{ art.price }</p>
                            </Col>
                            <Col>
                                <Button variant="danger" onClick={remove}>Remove</Button>
                            </Col>
                        </>
                    : 
                        <>
                            <Col>
                                <p>{orderItem.quantity}</p>
                            </Col>
                            <Col>
                                <p>{art.price}</p>
                            </Col>
                            <Col>
                                <p>{art.price * orderItem.quantity}</p>
                            </Col>
                        </>}

                </Row>
            </ListGroup.Item>
        </>
    )
}

export default OrderItem