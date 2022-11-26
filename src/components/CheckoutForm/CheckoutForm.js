import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Row, Card } from "react-bootstrap";
import OrderItem from "../OrderItem/OrderItem";
import AddressForm from "../AddressForm/AddressForm";
import AddressSelection from "../AddressSelection/AddressSelection";
import { loadStripe } from "@stripe/stripe-js";

function CheckoutForm(){
    const user = useSelector(state => state.user)
    const arts = useSelector(state => state.arts)
    const order = user.active_order
    const [addresses, setAddresses] = useState([])
    const [newAddress, setNewAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(user.addresses.shipping)
    const {REACT_APP_BACKEND_URL, REACT_APP_STRIPE_PUBLISHABLE_KEY} = process.env

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/addresses`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((ret) => ret.json())
        .then((data) => setAddresses(data))
    }, [])

    const orderItems = order.order_items.map((item) => <OrderItem 
                                                            art={arts.find((art) => art.id == item.art_id)} 
                                                            orderItem={item}
                                                            mode="order"
                                                        />)

    function checkOut(){
        fetch(`${REACT_APP_BACKEND_URL}/checkout_session`, {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
                referer: window.location.href
            },
            body: JSON.stringify({
                line1: selectedAddress.line1,
                line2: selectedAddress.line2,
                city: selectedAddress.city,
                state: selectedAddress.state,
                postal_code: selectedAddress.postal_code
            })
        })
        .then((ret) => ret.json())
        .then(async (data)=>{
            const stripe = await loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY)
            stripe.redirectToCheckout(data)
        })
    }

    return(
        <>
            <Row>
                <Col>{orderItems}</Col>   
                <Col>
                    {
                        newAddress ?
                        <Card>
                            <AddressForm 
                                setAddress={setSelectedAddress} 
                                address={selectedAddress} 
                            />
                            <Button onClick={()=>{setNewAddress(false)}} >Pick address from a list</Button>
                        </Card>
                        :
                        <Card>
                            <AddressSelection
                                addresses = {addresses}
                                setSelectedAddress = {setSelectedAddress}
                            />
                            <Button onClick={()=>{setNewAddress(true)}}>Use a new Address</Button>
                        </Card>
                    }
                </Col>
            </Row>
            <Row>
                <Button onClick={checkOut}>Checkout</Button>
            </Row>
        </>
    )
}

export default CheckoutForm