import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";

function CardForm({ cards, setCards }){
    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState('')
    const { REACT_APP_BACKEND_URL } = process.env

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(!stripe || !elements){
            return
        }

        const {error, setupIntent} = await stripe.confirmSetup({
            elements,
            redirect: 'if_required'
        })

        if(error){
            setErrorMessage(error.message)
        }
        else{
            fetch(`${REACT_APP_BACKEND_URL}/card/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stripe_id: setupIntent.payment_method
                })
            })
            .then((data) => data.json())
            .then((ret) => {
                setCards([...cards, {
                    stripe_id: ret.stripe_id,
                    last4: ret.last4,
                    brand: ret.brand,
                    exp_month: ret.exp_month,
                    exp_year: ret.exp_year
                }])
            })
        }
    }

    const options = {
        wallets: {
            applePay: 'never',
            googlePay: 'never'
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <PaymentElement options={options}/>
            <Button type="submit">Add Card to Profile</Button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    )
}

export default CardForm