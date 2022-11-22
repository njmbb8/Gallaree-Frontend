import React, {useState} from "react";
import { Button, Col, Form, Row, } from "react-bootstrap";
import { States } from "../../States";
import { authenticate } from "../../slices/User";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderItems } from "../../slices/Order";
import { setError } from "../../slices/Error"

function AddressForm({ address, setAddress, setAddresses, addresses, editMode, setEditMode}){
    const stateOptions = States.map((state, index) => {
        return <option key={index} value={state["alpha-2"]}>{state["alpha-2"]}</option>
    })

    const {REACT_APP_BACKEND_URL} = process.env

    function removeAddress(){
        fetch(`${REACT_APP_BACKEND_URL}/address/${address.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(()=>{
            setAddresses(
                addresses.filter((addr)=>addr.id != address.id)
            )
        })
    }

    function updateAddress(){
        fetch(`${REACT_APP_BACKEND_URL}/address/${address.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({address: address})
        })
        .then((ret)=>ret.json())
        .then((data)=>{
            setAddresses(
                addresses.map((addr)=>{
                    if(data.id === addr.id){
                        return data
                    }
                    else{
                        return addr
                    }
                })
            )
        })
    }

    function createNewAddress(){
        fetch(`${REACT_APP_BACKEND_URL}/address`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        })
        .then((ret)=>ret.json())
        .then((data)=>{
            setEditMode(!editMode)
            setAddresses([data, ...addresses])
        })
    }

    function clearForm(){
        setAddress({
            line1: '',
            line2: '',
            city: '',
            state: 'AL',
            postal_code: ''
        })
        setEditMode(false)
    }

    return(
        <>
            <Form>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Address Line 1:</Form.Label>
                        <Form.Control 
                            type="text" 
                            onChange={e => setAddress({...address, line1: e.target.value})}
                            value={address.line1}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Address Line 2:</Form.Label>
                        <Form.Control 
                            type="text"
                            onChange={e => setAddress({...address, line2: e.target.value})}
                            value={address.line2}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>City:</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setAddress({...address, city: e.target.value})}
                            value={address.city}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>State</Form.Label>
                            <Form.Select
                                value={address.state}
                                onChange={e => setAddress({...address, state: e.target.value})}
                            >
                                {stateOptions}
                            </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>ZIP:</Form.Label>
                        <Form.Control 
                            type="text"
                            value={address.postal_code}
                            onChange={e => setAddress({...address, postal_code: address.city})}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Check
                            type="switch"
                            label='Default Shipping?'
                            checked={address.shipping}
                            onChange={() => setAddress({...address, shipping: !address.shipping})}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Check
                            type="switch"
                            label='Default Billing?'
                            checked={address.billing}
                            onChange={() => setAddress({...address,billing: !address.billing})}
                        />
                    </Form.Group>
                </Row>
            </Form>
            {
                editMode ?
                <Row>
                    <Button onClick={updateAddress}>Update</Button>
                    <Button onClick={removeAddress} variant="danger">Remove</Button>
                    <Button onClick={clearForm} variant="success">Clear Form</Button>
                </Row>
                :
                <Row>
                    <Button onClick={createNewAddress}>Create New</Button>
                </Row>
            }
        </>
    )
}

export default AddressForm