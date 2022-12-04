import React, { useEffect } from "react";
import { Col, Form, Row, } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import { States } from "../../../../States";

function AddressForm({ address, setAddress}){
    const stateOptions = States.map((state, index) => {
        return <option key={index} value={state["alpha-2"]}>{state["alpha-2"]}</option>
    })

    useEffect(()=>{
        if(!address){
            setAddress({
                line1: '',
                line2: '',
                city: '',
                state: 'AL',
                postal_code: ''
            })
        }
    }, [address, setAddress])

    return(
        !!address ? 
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
                            onChange={e => setAddress({...address, postal_code: e.target.value})}
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
        </>
        :
        <TailSpin />
    )
}

export default AddressForm