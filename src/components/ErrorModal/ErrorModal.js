import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setError } from '../../slices/Error'

function ErrorModal(){
    const error = useSelector(state => state.error)
    const dispatch = useDispatch()
    return(
        <Modal show={error.length > 0} onHide={() => dispatch(setError(''))}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{error.error}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => dispatch(setError(''))}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorModal