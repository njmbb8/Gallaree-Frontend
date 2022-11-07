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
                body: JSON.stringify({
                    stripe_id: setupIntent.payment_method
                })
            })
            .then((data) => data.json())
            .then((ret) => setCards([...cards, {
                stripe_id: ret.id,
                final4: ret.card.last4,
                brand: ret.card.brand,
                month: ret.card.exp_month,
                year: ret.card.exp_year
            }]))
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Button type="submit">Add Card to Profile</Button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    )
}

export default CardForm