import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { authenticate } from "../../slices/User";
import AddressForm from "../AddressForm/AddressForm";
import { updateOrderItems } from "../../slices/Order";
import { setError } from "../../slices/Error"

function AddressSelection(){
    const user = useSelector(state => state.user)
    const [shipping, setShipping] = useState(user.stripe_info.shipping.address)
    const [billing, setBilling] = useState(user.stripe_info.address)
    const {REACT_APP_BACKEND_URL} = process.env
    function updateAddressInfo(){
        fetch(`${REACT_APP_BACKEND_URL}/addresses`,{
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({addresses: {address: billing, shipping: {...user.stripe_info.shipping, address: shipping}}})
        })
    }

    return (
        <>
            <Row>
                <Col>
                    <h3>Shipping Info:</h3>
                    <AddressForm 
                        address = {shipping} 
                        setAddress = {setShipping}  
                    />
                </Col>
                <Col>
                    <h3>Billing Info:</h3>
                    <AddressForm 
                        address = {billing}
                        setAddress = {setBilling}    
                    />
                </Col>
            </Row>
            <Row>
                <Button onClick={updateAddressInfo}>Update Addresses</Button>
            </Row>
        </>
    )
}

export default AddressSelection