import React, { useEffect, useState } from "react";
import { Container, Col, Row} from "react-bootstrap";
import GalleryCard from "./GalleryCard/GalleryCard";
import { useSelector } from "react-redux";

function Gallery(){
    const arts = useSelector( state => state.arts ) 
    function handleResize(){
        const arr = []
        
        if(window.innerWidth < 576){
            arr.push([])
        }
        else if(window.innerWidth >= 576 && window.innerWidth <= 992 ){
            arr.push(...[[],[]])
        }
        else{
            arr.push(...[[],[],[]])
        }
        
        for(let i = 0; i < arts.length; i++){
            if(!isNaN(i%arr.length)){
                arr[i%arr.length].push(<GalleryCard art={arts[i]} key={arts[i].id}/>)
            }
        }
        
        return(arr)
    }
    const [artArray, setArtArray] = useState(handleResize())

    window.addEventListener('resize', ()=>setArtArray(handleResize()))

    const cards = artArray.map((col, index)=>{
        return( 
            <Col key={`col-${index}`}>
                {col}
            </Col>
        )
    })


    return(
        arts.length > 0?
        <Container style={{"marginTop": "75px"}}>
            <Row xs={1} md={2} lg={3}>
                {cards}
            </Row>
        </Container>
        :
        <h3>No art to show, yet.</h3>
    )
}

export default Gallery