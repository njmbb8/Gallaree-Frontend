import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

function TrackingModal({order, show, setShow}){
    const [tracking, setTracking] = useState('')
    const { REACT_APP_BACKEND_URL } = process.env

    function handleSubmit(e){
        e.preventDefault()

        fetch(`${REACT_APP_BACKEND_URL}/order/${order.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tracking: tracking
            })
        })
    }
    return(
        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Tracking Number</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Tracking Number</Form.Label>
                        <Form.Control
                            type="text"
                            value={tracking}
                            onChange={e=>setTracking(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit">Add Tracking</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default TrackingModal