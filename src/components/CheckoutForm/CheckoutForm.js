import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import OrderItem from "../Navbar/OrderDisplay/OrderItem/OrderItem";
import AddressForm from "../UserPanel/AddressPanel/AddressForm/AddressForm";
import AddressSelection from "../UserPanel/AddressPanel/AddressSelection/AddressSelection";
import CardForm from "../UserPanel/CardPanel/CardForm/CardForm";
import CardSelection from "../UserPanel/CardPanel/CardSelection/CardSelection";
import AddressPanelButtons from "../UserPanel/AddressPanel/AddressForm/AddressPanelButtons/AddressPanelButtons";
import { Elements } from "@stripe/react-stripe-js";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import ShippingRates from "./ShippingRates/ShippingRates";

function CheckoutForm({stripePromise}){
    const user = useSelector(state => state.user)
    const arts = useSelector(state => state.arts)
    const order = user.active_order
    const [addresses, setAddresses] = useState(null)
    const [newAddress, setNewAddress] = useState(false)
    const [cards, setCards] = useState(null)
    const [newCard, setNewCard] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null)
    const [clientSecret, setClientSecret] = useState('')
    const {REACT_APP_BACKEND_URL} = process.env
    const navigate = useNavigate()

    
    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/payment_intent`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((ret) => ret.json())
        .then((data) => {
            setCards(data.cards)
            setAddresses(data.addresses)
        })
        
        fetch(`${REACT_APP_BACKEND_URL}/setup_intent`, {
            method: 'POST',
            credentials: 'include'
        })
        .then((response) => { 
            response.json().then((data) => {
                setClientSecret(data);
            }).catch((err) => {
                console.log(err);
            }) 
        });
    }, [REACT_APP_BACKEND_URL])
    
    const orderItems = order.order_items.map((item) => <OrderItem 
        art={arts.find((art) => art.id === item.art_id)} 
        orderItem={item}
        mode="order"
        key={item.id}
    />)

    function checkOut(){
        fetch(`${REACT_APP_BACKEND_URL}/payment_intent`, {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
                referer: window.location.href
            },
            body: JSON.stringify({
                shipping_id: selectedAddress.id,
                payment_method_id: selectedCard.stripe_id
            })
        })
        .then((ret)=>ret.json())
        .then((data) => {
            navigate(`/order/${order.id}/${data['client_secret']}`)
        })
    }

    const options = {
        clientSecret: clientSecret['clientSecret'],
        appearance: {
            theme: 'stripe',
        }
    }

    return(
        <Container style={{marginTop: "75px"}}>
            <Row>
                <Col>
                    {orderItems}
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        !!addresses?
                        <>
                            {
                                newAddress || addresses.length === 0?
                                    <>
                                        <AddressForm 
                                            setAddress={setSelectedAddress} 
                                            address={selectedAddress} 
                                        />
                                        <AddressPanelButtons 
                                            address={selectedAddress} 
                                            setAddress={setSelectedAddress} 
                                            addresses={addresses} 
                                            setAddresses={setAddresses} 
                                        />
                                        <Button onClick={()=>{setNewAddress(false)}} >Pick address from a list</Button>
                                    </>
                                :
                                <>
                                    <AddressSelection
                                        addresses = {addresses}
                                        setSelectedAddress = {setSelectedAddress}
                                        selectedAddress = {selectedAddress}
                                    />

                                    <Button onClick={()=>{setNewAddress(true)}}>Use a new Address</Button>
                                </>
                            }
                        </>
                        :
                        <>
                            <TailSpin />
                        </>

                    }
                    {/* {
                        newAddress ?
                        <>
                            <AddressForm 
                                setAddress={setSelectedAddress} 
                                address={selectedAddress} 
                            />
                            <AddressPanelButtons 
                                address={selectedAddress} 
                                setAddress={setSelectedAddress} 
                                addresses={addresses} 
                                setAddresses={setAddresses} 
                            />
                            <Button onClick={()=>{setNewAddress(false)}} >Pick address from a list</Button>
                        </>
                        :
                            !!addresses?
                            <>
                                <AddressSelection
                                    addresses = {addresses}
                                    setSelectedAddress = {setSelectedAddress}
                                    selectedAddress = {selectedAddress}
                                />

                                <Button onClick={()=>{setNewAddress(true)}}>Use a new Address</Button>
                            </>
                            :
                                <TailSpin />
                    } */}
                </Col>
                <Col>
                    {
                        newCard ?
                        <>
                            {
                                clientSecret !== ''?
                                <Elements stripe={stripePromise} options={options}>
                                    <CardForm cards={cards} setCards={setCards} />
                                </Elements>
                                :
                                <TailSpin />
                            }
                            <Button onClick={()=>setNewCard(false)} >Pick card from a list</Button>
                        </>
                        :
                        !!cards ?
                        <>
                            <CardSelection cards={cards} setCards={setCards} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
                            <Button onClick={()=>setNewCard(true)} > Use a new card</Button>
                        </>
                        :
                        <TailSpin />
                    }
                </Col>
            </Row>
            <Row>
                <Button onClick={checkOut}>Checkout</Button>
            </Row>
        </Container>
    )
}

export default CheckoutForm