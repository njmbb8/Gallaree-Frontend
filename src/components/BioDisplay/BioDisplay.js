import React, {useEffect, useState} from "react";
import { Col, Row, Image, Container } from "react-bootstrap";

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
            <Container style={{"marginTop": "75px"}}>
                <Row>
                    <Col xs={{span: 12}} md={{span: 6, offset: 3}} lg={{span: 4, offset: 4}}>
                        <Image fluid src={`${bio.photo}`} />
                    </Col>
                </Row>
                <Row xs={1} md={2} className="text-center">
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
            </Container>
        :
            <h3>Nothing to show!</h3>
    )

}

export default BioDisplay