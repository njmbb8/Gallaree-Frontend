import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./BioDisplay.css"

function BioDisplay(){
    const bio = useSelector(state => state.bio)
    const {REACT_APP_BACKEND_URL} = process.env

    return(
        <>
            <Col>
                <Row>
                    <Image id="artistImage" src={`${REACT_APP_BACKEND_URL}/${bio.photo}`} />
                </Row>
                <Row>
                    <Col className="textDisplay">
                        <h2>Biography</h2>
                        <p>
                            {bio.biography}
                        </p>
                    </Col>
                    <Col className="textDisplay">
                        <h2>Artist Statement</h2>
                        <p>
                            {bio.artist_statement}
                        </p>
                    </Col>
                </Row>
            </Col>
        </>
    )

}

export default BioDisplay