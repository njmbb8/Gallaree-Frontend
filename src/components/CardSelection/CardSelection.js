import React, { useEffect, useRef, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CardCard from "../CardCard/CardCard";

function CardSelection({cards, setCards, setSelectedCard, selectedCard}){
    const {REACT_APP_BACKEND_URL} = process.env
    // const [selectedCard, setSelectedCard] = useState(cards[0])

    // useEffect(()=>{
    //     setSelectedCard(cards[0])
    // }, [cards])
    
    // const cardCards = cards.map((card) => <CardCard key={card.stripe_id} card={card} selectedCard={!!selectedCard ? selectedCard : cards[0]} setSelectedCard={setSelectedCard}/>)
    const cardCards = cards.map((card) => <CardCard key={card.stripe_id} card={card} cards={cards} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>)
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