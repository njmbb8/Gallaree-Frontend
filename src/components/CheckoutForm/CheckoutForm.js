import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    PaymentElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";
import { Col, Row, ListGroup } from "react-bootstrap";
import OrderItem from "../OrderItem/OrderItem";
import AddressSelection from "../AddressSelection/AddressSelection";
import { setError } from "../../slices/Error"
import { setClientSecret } from "../../slices/ClientSecret";
import { authenticate } from "../../slices/User";
import { updateOrderItems } from "../../slices/Order";

function CheckoutForm(){
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] =  useState(false)
    const order = useSelector(state => state.order)
    const clientSecret = useSelector(state => state.clientSecret)
    const arts = useSelector(state => state.arts)
    const [shipping, setShipping] = useState({})
    const user = useSelector(state => state.user)
    const {REACT_APP_BACKEND_URL} = process.env
    const dispatch = useDispatch()

    useEffect(()=>{
        // if(!clientSecret || !user.active_order.payment_intent){
        //     fetch(`${REACT_APP_BACKEND_URL}/payment_intent/`, {
        //         method: 'POST',
        //         credentials: 'include',
        //         body: JSON.stringify({
        //             address_id: shipping.id
        //         })
        //     })
        //     .then((data) => {
        //         if(data.ok){
        //             return data.json()
        //         }
        //         else{
        //             throw Error(data.json())
        //         }
        //     })
        //     .then((ret)=>{
        //         dispatch(setClientSecret(ret.clientSecret))
        //         const payment_intent = new FormData()
        //         payment_intent.append('payment_intent', ret.payment_intent)
        //         fetch(`${REACT_APP_BACKEND_URL}/order/${order.id}`, {
        //             method: 'PATCH',
        //             credentials: 'include',
        //             body: payment_intent
        //         })
        //         .then((data)=>{
        //             if(data.ok){
        //                 return data.json()
        //             }
        //             else{
        //                 throw Error(data.json())
        //             }
        //         })
        //         .then((r)=>{
        //             dispatch(updateOrderItems(r))
        //             dispatch(authenticate({...user, active_order: r}))
        //         })
        //         .catch((error) => dispatch(setError(error.error)))
        //     })
        //     .catch((error)=>{dispatch(setError(error.error))})
        // }
        // else{
        //     fetch(`${REACT_APP_BACKEND_URL}/payment_intent/${user.active_order.id}`, {
        //         method: 'PATCH',
        //         credentials: 'include',
        //         body: JSON.stringify({
        //             address_id: shipping.id
        //         })
        //     })
        //     .then((data) => {
        //         if(!data.ok){
        //             throw Error(data.json())
        //         }
        //     })
        //     .catch((error) => dispatch(setError(error)))
        // }
        if(order.payment_intent){
            fetch(`${REACT_APP_BACKEND_URL}/payment_intent/${user.active_order.id}`, {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify({
                    address_id: shipping.id
                })
            })
            .then((data) => {
                if(!data.ok){
                    throw Error(data.json())
                }
            })
            .catch((error) => dispatch(setError(error)))
        }
    }, [])

    const itemRows = order.order_items.map((item) => {
        return arts.map((art) => {
            if (art.id === item.art_id)
                return <OrderItem key={item.id} art={art} orderItem={item} mode="checkout"/>
            else
                return null
        })
    })

    useEffect(() => {
        if(!stripe){
            return
        }

        if(!clientSecret){
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                  case "processing":
                    setMessage("Your payment is processing.");
                    break;
                  case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                  default:
                    setMessage("Something went wrong.");
                    break;
            }
        })
    }, [stripe, clientSecret])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!stripe || !elements){
            return
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `http://localhost:3000/success/${order.id}`
            }
        })

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } 
        else {
            setMessage("An unexpected error occured.");
        }

        setIsLoading(false)
    }

    return(
        <>
            <Row>
                <ListGroup>
                    {itemRows}
                </ListGroup>
            </Row>
            <Row>
                <Col>
                    <AddressSelection
                        shipping={shipping}
                        setShipping={setShipping}
                    />
                </Col>
                <Col>
                    <form id="payment-form" onSubmit={handleSubmit}>
                        <PaymentElement id="payment-element" />
                        <button disabled={isLoading || !stripe || !elements} id="submit">
                            <span id="button-text">
                                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                            </span>
                        </button>
                        {/* {message && <div id="payment-message">{message}</div>} */}
                    </form>
                </Col>
            </Row>
        </>
    )
}

export default CheckoutForm