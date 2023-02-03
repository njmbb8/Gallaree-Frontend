import React, {useState} from "react";
import { Stack, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './GalleryCard.css'


function GalleryCard({art}){
    const [overlay, setOverlay] = useState(window.innerWidth < 992? true : false)
    const {REACT_APP_BACKEND_URL} = process.env
    const navigate = useNavigate()

    function changeOverlayPresence(e){
        e.preventDefault()
        setOverlay(!overlay)
    }

    function clickHandler(e){
        navigate(`/art/${art.id}`)
    }

    return(
        <div
            style={{
                position: 'relative',
                paddingBottom: '10px',
                cursor: overlay?'pointer':'default'
            }}
            onMouseEnter={changeOverlayPresence}
            onMouseLeave={changeOverlayPresence}
            onClick={clickHandler}
        >
            <Image
                fluid
                src={`${REACT_APP_BACKEND_URL }${art.photo}`}
                style={{
                    width: "100%",
                    objectFit: 'cover',
                    verticalAlign: 'middle'
                }}
            />
            <div
                style={{
                    position:'absolute',
                    left:0,
                    bottom:10,
                    backgroundColor: 'rgba(0,0,0,.6)',
                    width: '100%',
                    color:'white',
                    padding:'10px',
                    display:overlay?'block':'none'
                }}
            >
                <Stack 
                    direction="vertical"
                >
                    <Stack direction="horizontal">
                        <div style={{
                                width:'70%',
                                paddingLeft: '25px'
                            }}
                        >
                            {art.title}
                        </div>
                        <div 
                            className="mx-auto"
                            style={{
                                textAlign: 'center',
                                width:'30%'
                            }}
                        >
                            {art.status !== "Not For Sale"?`$${art.price}`:art.status}
                        </div>
                    </Stack>
                    <Stack direction="horizontal">
                        <div
                            style={{
                                width:'70%',
                                paddingLeft: '25px'
                            }}
                        >
                            {`${art.length}in x ${art.width}in`}
                        </div>
                        <div 
                            className="mx-auto"
                            style={{
                                textAlign: 'center',
                                width:'30%'
                            }}
                        >
                            {art.status !== "Not For Sale"?`$${art.status}`:null}
                        </div>
                    </Stack>
                    <div
                        style={{
                            width:'100%',
                            paddingLeft: '25px'
                        }}
                    >
                        {`${art.description}`.slice(0, 50)+`${art.description.length > 50? '...':''}`}
                    </div>
                </Stack>
            </div>
        </div>
    )
}

export default GalleryCard