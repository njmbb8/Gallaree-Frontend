import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard/BlogCard";

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
            <>
                {blogCards}
            </>
        :
        <h3>No blog posts yet!</h3>
    )
}

export default Blogs