import React, {useEffect, useState} from "react";
import { Col, Row, Image } from "react-bootstrap";
import "./BioDisplay.css"

function BioDisplay(){
    const [bio, setBio] = useState({})
    const {REACT_APP_BACKEND_URL} = process.env

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/bio`)
        .then((data) => data.json())
        .then((ret) => {
            ret === null?setBio({}):setBio(ret)
        })
    }, [REACT_APP_BACKEND_URL])

    return(
        Object.keys(bio).length > 0?
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
        :
            <h3>Nothing to show!</h3>
    )

}

export default BioDisplay