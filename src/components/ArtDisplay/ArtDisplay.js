import React, { useState } from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArtForm from "../ArtForm/ArtForm";
import './ArtDisplay.css'

function ArtDisplay({ arts, setArts, statuses }){
    const { REACT_APP_BACKEND_URL } = process.env
    const params = useParams()
    const art = arts.find((art) => parseInt(params.id) === art.id)
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false)
    const user = useSelector(state => state.user)

    function deleteArt(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/arts/${art.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(() => {
            navigate('/')
            setArts(arts.filter((item) => item.id !== art.id))
        })
    }
    
    return(
        <>{edit ? 
            <ArtForm 
                statuses={statuses}
                arts={arts}
                setArts={setArts}
                setEdit={setEdit}
                mode={'edit'}/>
            :
            <Row>
                <Col xs={3} className="art-info">
                    <Row>
                        <h1>{art.title}</h1>
                    </Row>
                    <Row>
                        <h6>{art.status.name}</h6>
                    </Row>
                    <Row>
                        <h6>{art.price}</h6>
                    </Row>
                    <Row>
                        <p>{art.description}</p>
                    </Row>
                    <Row>
                        {
                            !!user.user && Object.entries(user.user).length > 0 ? 
                            <>
                                <Button variant="primary" onClick={() => setEdit(!edit)}>Edit</Button>
                                <Button variant="danger" onClick={deleteArt}>Delete</Button>
                            </>
                            :
                            null
                        }
                    </Row>
                </Col>
                <Col xs={9} className="art">
                    <Image src={`${REACT_APP_BACKEND_URL }${art.photo}`} />
                </Col>
            </Row>
            }
            
        </>
    )
}

export default ArtDisplay