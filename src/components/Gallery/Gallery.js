import React from "react";
import { Row } from "react-bootstrap";
import GalleryCard from "../GalleryCard/GalleryCard";

function Gallery({ arts, setArts }){

    const cards = arts.map((art) =>{
        return <GalleryCard art={art} setArts={setArts} key={art.id}/>
    })

    return(
        <>
            <Row xs={1} md={2} lg={3} className="g-3">
                {cards}
            </Row>
        </>
    )
}

export default Gallery