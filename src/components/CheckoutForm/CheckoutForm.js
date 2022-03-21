import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import {
    PaymentElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";

function CheckoutForm(){
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] =  useState(false)
    const order = useSelector(state => state.order)

    useEffect(() => {
        if(!stripe){
            return
        }

        const clientSecret = useSelector(state => state.clientSecret)

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
    }, [stripe])

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
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}

export default CheckoutForm