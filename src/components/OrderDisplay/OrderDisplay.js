import React from "react";
import { Offcanvas, ListGroup, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import OrderItem from "../OrderItem/OrderItem";

function OrderDisplay({showOrder, setShowOrder}){
    const order = useSelector(state => state.order)
    const arts = useSelector(state => state.arts)
    const itemRows = order.items.map((item) => {
        return arts.map((art) => {
            if (art.id === item.art_id)
                return <OrderItem key={item.id} art={art} orderItem={item} mode="order"/>
            else
                return null
        })
    })

    return(
        <>
            <Offcanvas show={showOrder} onHide={() => setShowOrder(!showOrder)} placement="end">
                <ListGroup>
                    {itemRows}
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <h5>Subotal: </h5>
                            </Col>
                            <Col>
                                <h5>{order.order_total}</h5>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <h5>Processing Fees: </h5>
                            </Col>
                            <Col>
                                <h5>{order.stripe_fee}</h5>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <h5>Total: </h5>
                            </Col>
                            <Col>
                                <h5>{order.total_with_fee}</h5>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <Button href="/checkout" variant="primary">Checkout</Button>
                </ListGroup>
            </Offcanvas>
        </>
    )
}

export default OrderDisplay