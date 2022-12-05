import React, { useEffect, useState } from "react";
import { ListGroup, Row, Col, Card, ButtonGroup, Button } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OrderItem from "../Navbar/OrderDisplay/OrderItem/OrderItem";
import TrackingModal from "./TrackingModal/TrackingModal";
import { loadStripe } from "@stripe/stripe-js";

function Order(){
    const params = useParams()
    const { REACT_APP_BACKEND_URL, REACT_APP_STRIPE_PUBLISHABLE_KEY } = process.env
    const [order, setOrder] = useState(null)
    const arts = useSelector(state => state.arts)
    const user = useSelector(state => state.user)
    const [showModal, setShowModal] = useState(false)
    const [orderStatus, setOrderStatus] = useState('')

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/order/${params['id']}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((ret)=>ret.json())
        .then((data)=>{
            setOrder(data)
            setOrderStatus(data.status)
        })
    }, [orderStatus])

    
    useEffect(async () => {
        const stripe = await loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY)
        const interval = setInterval(async ()=>{
            const {paymentIntent} = await stripe.retrievePaymentIntent(params['clientSecret'])
            if(paymentIntent && paymentIntent.status !== orderStatus){
                setOrderStatus(paymentIntent.status)
            }
        }, 1000)
        return () => clearInterval(interval)
      }, [])

    function handleCancel(){
        fetch(`${REACT_APP_BACKEND_URL}/order/${order.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then((data)=>data.json())
        .then((ret)=>{
            setOrder(ret)
        })
    }

    function handleShowModal(){
        setShowModal(true)
    }

    function orderItems(){
        return order.order_items.map((item) => {
            return arts.map((art) => {
                if (art.id === item.art_id)
                    return <OrderItem key={item.id} art={art} orderItem={item} mode="list"/>
                else
                    return null
            })
        })
    }

    return(
        !!order?
            <>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Order Items:</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col><p> </p></Col>
                                            <Col><p>Title:</p></Col>
                                            <Col><p>Quantity:</p></Col>
                                            <Col><p>Price:</p></Col>
                                            <Col><p>Item Total:</p></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {orderItems()}
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col>
                                        <h5>Subotal: </h5>
                                    </Col>
                                    <Col>
                                        <h5>{order.order_total}</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5>Processing Fees: </h5>
                                    </Col>
                                    <Col>
                                        <h5>{order.stripe_fee}</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5>Total: </h5>
                                    </Col>
                                    <Col>
                                        <h5>{order.total_with_fee}</h5>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>Order Details:</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Row><h6>Shipping Address:</h6></Row>
                                        <Row>
                                            <p>{`${order.shipping_address.line1} ${order.shipping_address.line2}`}</p>
                                        </Row>
                                        <Row>
                                            <p>{`${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.postal_code}`}</p>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row><h6>Billing Address:</h6></Row>
                                        <Row>
                                            <p>{`${order.billing_address.line1} ${order.billing_address.line2}`}</p>
                                        </Row>
                                        <Row>
                                            <p>{`${order.billing_address.city}, ${order.billing_address.state} ${order.billing_address.postal_code}`}</p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row><h6>Card Information</h6></Row>
                                        <Row><p>{`Card Number: ************${order.card_used.last4}`}</p></Row>
                                        <Row><p>{`Expiration Date: ${order.card_used.exp_month}/${order.card_used.exp_year}`}</p></Row>
                                    </Col>
                                    <Col>
                                        <Row><h6>Order Details:</h6></Row>
                                        <Row>
                                            <Col><p>Order Placed: {(new Date(order.place_time)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</p></Col>
                                        </Row>
                                        <Row><p>Status: {order.status}</p></Row>
                                        {
                                            order.status === 'Shipped'?
                                                <>
                                                    <Row><p>Tracking #: {order.tracking}</p></Row>
                                                    <Row><p>Order Shipped: {(new Date(order.ship_time)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</p></Row>
                                                </>
                                            :
                                                null
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                            {
                                order.status !== 'Shipped' || user.admin?
                                    <Card.Footer>
                                        <ButtonGroup>
                                            {
                                                user.admin?
                                                    <>
                                                        <Button onClick={handleCancel}>Refund Order</Button>
                                                        <Button onClick={handleShowModal}>Mark as shipped</Button>
                                                    </>
                                                :
                                                    <Button onClick={handleCancel}>Cancel Order</Button>
                                            }
                                        </ButtonGroup>
                                    </Card.Footer>
                                :
                                    null
                            }
                        </Card>
                    </Col>
                </Row>
                <TrackingModal
                    order={order}
                    show={showModal}
                    setShow={setShowModal}
                />
            </>
        :
            <TailSpin />
    )
}

export default Order