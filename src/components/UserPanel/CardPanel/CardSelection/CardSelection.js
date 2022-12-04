import React from "react";
import { Button, Row } from "react-bootstrap";
import CardCard from "./CardCard/CardCard";

function CardSelection({cards, setCards, setSelectedCard, selectedCard}){
    const {REACT_APP_BACKEND_URL} = process.env
   
    const cardCards = cards.map((card) => <CardCard key={card.stripe_id} card={card} cards={cards} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>)
    function handleDelete(){
        fetch(`${REACT_APP_BACKEND_URL}/card/${selectedCard.id}`, {
            method: "DELETE",
            credentials: 'include'
        })
        .then((ret)=>ret.json())
        .then((data)=>{
            setCards(cards.filter((card)=>card.id!==data.id))
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