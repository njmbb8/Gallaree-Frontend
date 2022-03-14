import React from "react";
import { Row, Image, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeItem } from "../../slices/Order";

function OrderItem({orderItem}){
    const { REACT_APP_BACKEND_URL } = process.env
    const dispatch = useDispatch()

    function remove(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/${orderItem.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(()=> dispatch(removeItem(orderItem)))
    }

    return(
        <>
            <Row>
                <Image thumbnail={true} src={`${REACT_APP_BACKEND_URL }${orderItem.photo}`} />
                <p>{ orderItem.title }</p>
                <p>{ orderItem.price }</p>
                <Button variant="Danger" onClick={remove}>Remove</Button>
            </Row>
        </>
    )
}

export default OrderItem