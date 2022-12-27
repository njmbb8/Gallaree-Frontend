import React, { useEffect, useState } from "react";
import { Col, Container, Stack } from "react-bootstrap";
import BlogCard from "./BlogCard/BlogCard";
import "./Blogs.css"

function Blogs(){
    const [blogPosts, setBlogPosts] = useState([])
    const {REACT_APP_BACKEND_URL} = process.env

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/blogs`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((ret)=> ret.json())
        .then((data)=>{
            setBlogPosts(data)
        })
    }, [REACT_APP_BACKEND_URL])

    const blogCards = blogPosts ? blogPosts.map((blog)=><BlogCard blog={blog} />) : null

    return(
        blogPosts.length > 0?
            <Container className="blogContainer">
                <Stack direction="vertical" gap={3}>
                    {blogCards}
                </Stack>
            </Container>
        :
        <h3>No blog posts yet!</h3>
    )
}

export default Blogs