import React from "react";
import { Container, Row } from "react-bootstrap";
import GalleryCard from "./GalleryCard/GalleryCard";
import { useSelector } from "react-redux";

function Gallery(){
    const arts = useSelector( state => state.arts ) 
    const cards = arts.map((art) =>{
        return <GalleryCard art={art} key={art.id}/>
    })

    return(
        arts.length > 0?
        <Container style={{"margin-top": "75px"}}>
            <Row xs={1} md={2} lg={3} className="g-3">
                {cards}
            </Row>
        </Container>
        :
        <h3>No art to show, yet.</h3>
    )
}

export default Gallery