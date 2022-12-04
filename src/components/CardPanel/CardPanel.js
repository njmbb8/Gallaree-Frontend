import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CardForm from "../CardForm/CardForm";
import CardSelection from "../CardSelection/CardSelection";
import { Elements } from "@stripe/react-stripe-js";
import { TailSpin } from "react-loader-spinner";

function CardPanel({stripePromise}){
    const [clientSecret, setClientSecret] = useState('')
    const [cards, setCards] = useState([])
    const {REACT_APP_BACKEND_URL} = process.env
    const [selectedCard, setSelectedCard] = useState(null)

    useEffect(() => {
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

        fetch(`${REACT_APP_BACKEND_URL}/card`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((ret)=>ret.json())
        .then((data)=>setCards(data))
    }, [])

    const options = {
        clientSecret: clientSecret['clientSecret'],
        appearance: {
            theme: 'stripe',
        }
    }

    return(
        <Row>
            <Col>
                <CardSelection 
                    cards={cards} 
                    setCards={setCards}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                />
            </Col>
            <Col>
                <>
                    {
                        clientSecret !== ''?
                        <Elements stripe={stripePromise} options={options}>
                            <CardForm cards={cards} setCards={setCards} />
                        </Elements>
                        :
                        <TailSpin />
                    }
                </>
            </Col>
        </Row>
    )
}

export default CardPanel