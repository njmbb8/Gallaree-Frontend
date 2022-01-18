import React, {useState} from "react";
import { Card, Col } from "react-bootstrap";

function GalleryCard({art}){

    const [overlay, setOverlay] = useState(false)

    return(
        <>
            <Col>
                <Card className="text-white">
                    <Card.Img 
                        src={`http://localhost:4000/${art.photo}`}
                        onMouseEnter={()=>setOverlay(!overlay)} 
                    />
                    {!overlay ? <Card.Footer className="text-black">{art.title}</Card.Footer> : null}
                    {overlay ? <Card.ImgOverlay 
                                onMouseLeave={()=>setOverlay(!overlay)}
                                className="bg-dark opacity-75">
                        <Card.Title>{art.title}</Card.Title>
                        <Card.Text>{art.description}</Card.Text>
                    </Card.ImgOverlay> : null}
                </Card>
            </Col>
        </>
    )
}

export default GalleryCard