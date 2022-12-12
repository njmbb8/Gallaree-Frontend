import { set } from "immer/dist/internal";
import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Blog(){
    const { REACT_APP_BACKEND_URL } = process.env
    const [blog, setBlog] = useState(null)
    const [comment, setComment] = useState(null)
    const [error, setError] = useState(null)
    const params = useParams()

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/blog/${params.id}`, {
            method: 'GET',
            credentials: 'include',
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then((ret)=>ret.json())
        .then((data)=>{
            setBlog(data)
        })
    }, [])

    function postComment(e){
        e.preventDefault()
        if(comment.length === 0 || !comment){
            setError("Can't send an empty comment!")
        }
        else{
            setError(null)
            fetch(`${REACT_APP_BACKEND_URL}/comment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body: comment,
                    blog_id: params.id
                })
            })
            .then((ret)=>ret.json())
            .then((data)=>{
                setBlog({...blog, comments: [data, ...blog.comments]})
            })
        }
    }

    const comments = blog.comments.map((comment)=><Comment comment={comment} key={comment.id}/>)

    return(
        <>
            <Image src={`${REACT_APP_BACKEND_URL}${blog.photo}`} />
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
            <Form onSubmit={postComment}>
                <Form.Group>
                    <Form.Label>Leave a Comment:</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">

                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            {comments}
        </>
    )
}

export default Blog