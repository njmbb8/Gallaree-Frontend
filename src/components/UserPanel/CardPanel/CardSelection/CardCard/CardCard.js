import React, { useEffect } from "react";
import { FaCcAmex, FaCcDiscover, FaCcJcb, FaCcMastercard, FaCcStripe, FaCcVisa } from 'react-icons/fa'
import { Row, Col, Card } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";

function CardCard({card, cards, setSelectedCard, selectedCard}){

    function getLogo(){
        switch (card.brand) {
            case 'amex':
                return <FaCcAmex />
            case 'mastercard':
                return <FaCcMastercard />
            case 'visa':
                return <FaCcVisa />
            case 'discover':
                return <FaCcDiscover />
            case 'diners':
                return <FaCcDiscover />
            case 'jcb':
                return <FaCcJcb />
            default:
                return <FaCcStripe />
        }
    }

    const cardLogo = getLogo()

    useEffect(()=>{
        if(!selectedCard){
            setSelectedCard(cards[0])
        }
    }, [cards])

    return(
        !!selectedCard ?
            <Row>
                <Card onClick={() => setSelectedCard(card)} bg={selectedCard.id === card.id ? 'primary' : null}>
                    <Card.Header>
                        <Row>    
                            <Col>
                                {cardLogo}
                            </Col>
                            <Col>
                                {`************${card.last4}`}
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>Exp Date: </Col>
                            <Col>{`${card.exp_month}/${card.exp_year}`}</Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
        :
            <TailSpin />
    )
}

export default CardCard