import React, { useEffect, useState } from "react";
import { Container, Col, Row} from "react-bootstrap";
import GalleryCard from "./GalleryCard/GalleryCard";
import { useSelector } from "react-redux";

function Gallery(){
    const arts = useSelector( state => state.arts ) 
    const [artArray, setArtArray] = useState(()=>{
        if(window.innerWidth < 576){
            return [[]]
        }
        else if(window.innerWidth >= 576 && window.innerWidth <= 768 ){
            return [[],[]]
        }
        else{
            return [[],[],[]]
        }
    })

    useEffect(()=>{
        const arr = artArray
        for(let i = 0; i < arts.length; i++){
            switch(i%artArray.length){
                case 0:
                    arr[0].push(<GalleryCard art={arts[i]} key={arts[i].id}/>)
                    break
                case 1:
                    arr[1].push(<GalleryCard art={arts[i]} key={arts[i].id}/>)
                    break
                case 2:
                    arr[2].push(<GalleryCard art={arts[i]} key={arts[i].id}/>)
                    break
            }
        }
        setArtArray(arr.splice(0))
    }, [arts])

    const cards = artArray.map((col, index)=>{
        return( <Col key={index}>
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