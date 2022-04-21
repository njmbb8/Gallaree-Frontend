import React from "react";
import { Modal, Button } from "react-bootstrap";

function ErrorModal({error, show, setShow}){
    return(
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{error.error}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShow(false)}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorModal