import React, { useState } from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../../slices/Arts"
import ArtForm from "../ArtForm/ArtForm";
import './ArtDisplay.css'

function ArtDisplay({ statuses }){
    const { REACT_APP_BACKEND_URL } = process.env
    const params = useParams()
    const arts = useSelector(state => state.arts)
    const art = arts.find((art) => parseInt(params.id) === art.id)
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    function deleteArt(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/arts/${art.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(() => {
            navigate('/')
            dispatch(remove(art))
        })
    }

    function addToCart(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/order_items/`, {
            method: 'POST',
            credentials: 'include',
            body: {
                'art_id': art.id
            }
        })
    }
    
    return(
        <>{edit ? 
            <ArtForm 
                statuses={statuses}
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
                            Object.entries(user).length > 0 ?
                                user.admin ? 
                                <>
                                    <Button variant="primary" onClick={() => setEdit(!edit)}>Edit</Button>
                                    <Button variant="danger" onClick={deleteArt}>Delete</Button>
                                </>
                                :
                                <Button variant="primary" onClick={addToCart}>Add to cart</Button>
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