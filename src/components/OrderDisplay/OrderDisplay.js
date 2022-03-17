import React from "react";
import { Offcanvas, ListGroup, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import OrderItem from "../OrderItem/OrderItem";

function OrderDisplay({showOrder, setShowOrder}){
    const order = useSelector(state => state.order)
    const arts = useSelector(state => state.arts)
    const orderItems = order.order_items.map((item) => {
        return arts.filter((arts) => {
            return arts.id === item.art_id
        })
    })

    const itemRows = orderItems[0].map((item) => <OrderItem key={item.id} orderItem={item} />)

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
                                <Button variant="primary">Checkout</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Offcanvas>
        </>
    )
}

export default OrderDisplay