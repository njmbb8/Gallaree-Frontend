import React, {useState} from "react";
import { CardGroup, Col, Row } from "react-bootstrap";
import GalleryCard from "../GalleryCard/GalleryCard";

function Gallery({arts}){
    const cards = arts.map((art, index) =>{
        return <GalleryCard art={art} key={index}/>
    })

    return(
        <>
            <Row xs={1} md={2} lg={4} className="g-3">
                {cards}
            </Row>
        </>
    )
}

export default Gallery