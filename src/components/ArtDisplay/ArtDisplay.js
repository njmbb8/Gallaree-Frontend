import React, { useState } from "react";
import { Col, Row, Image, Button, Form, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../../slices/Arts"
import { authenticate } from "../../slices/User";
import ArtForm from "../AdminPanel/ArtForm/ArtForm";
import './ArtDisplay.css'
import { setError } from "../../slices/Error"

function ArtDisplay(){
    const { REACT_APP_BACKEND_URL } = process.env
    const params = useParams()
    const arts = useSelector(state => state.arts)
    const art = arts.find((art) => parseInt(params.id) === art.id)
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false)
    const [ quantity, setQuantity ] = useState(0)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    function deleteArt(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/arts/${art.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then((data)=>{
            if(data.ok){                
                navigate('/')
                dispatch(remove(art))
            }
            else{
                dispatch(setError(data.json()))
            }
        })
    }

    function addToCart(e){
        e.preventDefault()
        const sendData = new FormData()
        sendData.append('art_id', art.id)
        sendData.append('quantity', quantity)
        fetch(`${REACT_APP_BACKEND_URL}/order_items/`, {
            method: 'POST',
            credentials: 'include',
            body: sendData
        })
        .then((data) => {
            if(!data.ok){
                throw Error(data.json())
            }
            else{
                return data.json()
            }
        })
        .then((ret) => dispatch(authenticate({...user, active_order: ret})))
        .catch((error) => dispatch(setError(error)))
    }
    
    return(
        <Container id="display">
            {
                edit ? 
                    <ArtForm 
                        setEdit={setEdit}
                        mode={'edit'}
                    />
                :
                    <Row xs={1} sm={2}>
                        <Image src={`${REACT_APP_BACKEND_URL }${art.photo}`} />
                        <Col className="art-info">
                            <Row>
                                <h1>{art.title}</h1>
                            </Row>
                            <Row>
                                <h6>{art.status}</h6>
                            </Row>
                            <Row>
                                <h6>${art.price}</h6>
                            </Row>
                            <Row>
                                <p >{art.description}</p>
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
                                        art.status === "For Sale" ?
                                            <>
                                                <Form onSubmit={addToCart}>
                                                    <Form.Group>
                                                        <Form.Label>{`Quantity(Max:${art.quantity})`}</Form.Label>
                                                        <Form.Control 
                                                            type="number"
                                                            max={art.quantity}
                                                            onChange = {((e) => setQuantity(e.target.value))}
                                                            />
                                                    </Form.Group>
                                                    <Button type="submit" variant="primary">Add to cart</Button>
                                                </Form>
                                            </>
                                        :
                                        null
                                    :
                                    null
                                }
                            </Row>
                        </Col>
                    </Row>
            }
        </Container>
    )
}

export default ArtDisplay