import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import CardCard from "../CardCard/CardCard";

function CardSelection({cards, setCards}){
    const {REACT_APP_BACKEND_URL} = process.env
    const [selectedCard, setSelectedCard] = useState(null)

    useEffect(() => {
        fetch(`${REACT_APP_BACKEND_URL}/card`, {
            method: 'GET',
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((data) => setCards(data))
    }, [])
    
    const cardCards = cards.map((card) => <CardCard key={card.stripe_id} card={card} setSelectedCard={setSelectedCard}/>)

    function handleDelete(){
        fetch(`${REACT_APP_BACKEND_URL}/card/${selectedCard}`, {
            method: "DELETE",
            credentials: 'include'
        })
        .then(()=>{
            setCards(cards.filter((card)=>card.id!==selectedCard))
            setSelectedCard(null)
        })
    }
    
    return(
        <>
            <Row>
                {cardCards}
            </Row>
            {
                selectedCard !== null?
                    <Button variant="danger" onClick={handleDelete}>Remove</Button>
                :
                null
            }
        </>
    )
}

export default CardSelection