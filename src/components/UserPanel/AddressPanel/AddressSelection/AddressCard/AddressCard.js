import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";

function AddressCard({ address, addresses, setSelectedAddress, selectedAddress}){
    function handleClick(){
        if(selectedAddress.id === address.id){
            setSelectedAddress({
                line1: '',
                line2: '',
                city: '',
                state: 'AL',
                postal_code: ''
            })
        }
        else{
            setSelectedAddress(address)
        }
        
    }

    useEffect(()=>{
        if(!selectedAddress){
            setSelectedAddress(addresses.find((addr)=>addr.shipping))
        }
    }, [addresses, selectedAddress, setSelectedAddress])

    return(
        !!selectedAddress ?
        <Card onClick={handleClick} bg={selectedAddress.id === address.id ? 'info' : null}>
            <Card.Header>
                <Row>
                    <Col>{`${address.line1} ${address.line2}`}</Col>
                    {address.shipping? <Col>Default Shipping</Col> : null}
                    {address.billing? <Col>Default Billing</Col> : null}
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>{`${address.city}, ${address.state}`}</Col>
                    <Col>{address.postal_code}</Col>
                </Row>
            </Card.Body>
        </Card>
    :
        <TailSpin />
    )
}

export default AddressCard