import React, { useState } from "react";
import { FaCcAmex, FaCcDiscover, FaCcJcb, FaCcMastercard, FaCcStripe, FaCcVisa } from 'react-icons/fa'
import { Row, Col, Card } from "react-bootstrap";

function CardCard({card, setSelectedCard}){

    function getLogo(){
        switch (card.brand) {
            case 'amex':
                return <FaCcAmex />
                break;
            case 'mastercard':
                return <FaCcMastercard />
                break
            case 'visa':
                return <FaCcVisa />
                break
            case 'discover':
                return <FaCcDiscover />
                break
            case 'diners':
                return <FaCcDiscover />
                break
            case 'jcb':
                return <FaCcJcb />
                break
            default:
                return <FaCcStripe />
                break;
        }
    }

    const cardLogo = getLogo()

    return(
        <Row>
            <Card onClick={() => setSelectedCard(card.id)}>
                <Card.Header>
                    <Row>    
                        <Col>
                            {cardLogo}
                        </Col>
                        <Col>
                            {`************${card.final4}`}
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>Exp Date: </Col>
                        <Col>{`${card.month}/${card.year}`}</Col>
                    </Row>
                </Card.Body>
            </Card>
        </Row>
    )
}

export default CardCard