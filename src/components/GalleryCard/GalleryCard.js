import React, {useState} from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './GalleryCard.css'


function GalleryCard({art, arts, setArts, user}){

    const [overlay, setOverlay] = useState(false)
    const {REACT_APP_BACKEND_URL} = process.env
    const navigate = useNavigate()

    function changeOverlayPresence(e){
        setOverlay(!overlay)
        e.preventDefault()
    }

    function clickHandler(e){
        navigate(`/art/${art.id}`)
    }

    function deleteArt(e){
        fetch(`${REACT_APP_BACKEND_URL}/${art.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(() => {
            setArts(arts.filter((artPiece) => artPiece.id !== art.id))
        })
    }

    return(
        <>
            <Card
                className="text-white d-none d-xl-flex"
                onClick={clickHandler}
                >
                <Card.Img 
                    src={`${REACT_APP_BACKEND_URL }${art.photo}`}
                    onPointerEnter={changeOverlayPresence} 
                />
                {overlay ? <Card.ImgOverlay 
                            onPointerLeave={changeOverlayPresence}
                            className="bg-dark opacity-75">
                    <Card.Title>{art.title}</Card.Title>
                    <Card.Text>{art.status.name}</Card.Text>
                    {art.status.id === 2 ? <Card.Text>{art.price}</Card.Text> : null}
                    <Card.Text >{art.description}</Card.Text>
                </Card.ImgOverlay> : null}
            </Card>
            <Card
                className="text-white d-xl-none"
                >
                <Card.Img 
                    src={`${REACT_APP_BACKEND_URL }${art.photo}`}
                    onPointerEnter={changeOverlayPresence} 
                />
                {overlay ? <Card.ImgOverlay 
                            onPointerLeave={changeOverlayPresence}
                            className="bg-dark opacity-75">
                    <Card.Title>{art.title}</Card.Title>
                    <Card.Text>{art.status.name}</Card.Text>
                    {art.status.id === 2 ? <Card.Text>{art.price}</Card.Text> : null}
                    <Card.Text >{art.description}</Card.Text>
                    <Link className="text-white" to={`/art/${art.id}`}>View this Art</Link>
                    <Button  onClick={ deleteArt }>Delete</Button>
                    {!!user ? <Button variant="danger" onClick={ deleteArt }>Delete</Button> : null}
                </Card.ImgOverlay> : null}
            </Card>
        </>
    )
}

export default GalleryCard