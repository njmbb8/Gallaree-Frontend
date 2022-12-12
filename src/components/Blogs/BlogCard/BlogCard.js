import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog }){
    const { REACT_APP_BACKEND_URL } = process.env
    const navigate = useNavigate()

    return(
        <Card onClick={()=>navigate(`/blog/${ blog.id }`)}>
            <Card.Header>{ blog.created_at }</Card.Header>
            <Card.Img variant="top" src={`${REACT_APP_BACKEND_URL}${blog.photo}`} />
            <Card.Body>
                <Card.Title>{ blog.title }</Card.Title>
                <Card.Body>{ blog.text_preview }</Card.Body>
            </Card.Body>
        </Card>
    )
}

export default BlogCard