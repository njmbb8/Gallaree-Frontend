import React from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function BioDisplay(){
    const bio = useSelector(state => state.bio)
    const {REACT_APP_BACKEND_URL} = process.env

    return(
        <>
            <Col>
                <Row>
                    <Image src={`${REACT_APP_BACKEND_URL}/${bio.photo}`} />
                </Row>
                <Row>
                    <Col>
                        <h2>Biography</h2>
                        <p>
                            {bio.biography}
                        </p>
                    </Col>
                    <Col>
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