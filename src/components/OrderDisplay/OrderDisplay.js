import React from "react";
import { Offcanvas, ListGroup, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import OrderItem from "../OrderItem/OrderItem";

function OrderDisplay({showOrder, setShowOrder}){
    const order = useSelector(state => state.order)
    const arts = useSelector(state => state.arts)
    const itemRows = order.order_items.map((item) => {
        return arts.map((art) => {
            if (art.id === item.art_id)
                return <OrderItem key={item.id} art={art} orderItem={item}/>
            else
                return null
        })
    })

    // const itemRows = orderItems[0].map((item) => <OrderItem key={item.id} art={item} order={order}/>)

    return(
        <>
            <Offcanvas show={showOrder} onHide={() => setShowOrder(!showOrder)} placement="end">
                <ListGroup>
                    {itemRows}
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <h3>{order.order_total}</h3>
                            </Col>
                            <Col>
                                <Button href="/checkout" variant="primary">Checkout</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Offcanvas>
        </>
    )
}

export default OrderDisplay