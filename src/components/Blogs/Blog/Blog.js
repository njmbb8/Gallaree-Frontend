import React, { useEffect, useState } from "react";
import { Button, Form, Image, Row, Col, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../../AdminPanel/BlogForm/BlogForm";
import Comment from "./Comment/Comment";

function Blog(){
    const { REACT_APP_BACKEND_URL } = process.env
    const [blog, setBlog] = useState(null)
    const [comment, setComment] = useState(null)
    const [error, setError] = useState(null)
    const params = useParams()
    const user = useSelector(state => state.user)
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`${REACT_APP_BACKEND_URL}/blogs/${params.id}`, {
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
    }, [REACT_APP_BACKEND_URL, params.id])

    function postComment(e){
        e.preventDefault()
        if(comment.length === 0 || !comment){
            setError("Can't send an empty comment!")
        }
        else{
            setError(null)
            fetch(`${REACT_APP_BACKEND_URL}/comments`, {
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

    function handleDelete(e){
        e.preventDefault()

        fetch(`${REACT_APP_BACKEND_URL}/blogs/${blog.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then((res)=>{
            if(res.ok){
                navigate('/blog/')
            }
        })
    }

    const comments = blog ? blog.comments.map((comment)=><Comment blog={blog} setBlog={setBlog} comment={comment} key={comment.id}/>) : null

    return(
        blog ? 
        <>
            {
                user.admin?
                    <Row>
                        <Col>
                            <Button 
                                className="w-100" 
                                variant="danger"
                                onClick={handleDelete}
                            >Delete Post</Button>
                        </Col>
                        <Col>
                            <Button 
                                className="w-100" 
                                variant="primary"
                                onClick={()=>setEdit(true)}
                            >Edit Post</Button>
                        </Col>
                    </Row>
                :
                    null
            }
            {
                !edit ?
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
                                    isInvalid={!!error}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {error}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit">Submit</Button>
                        </Form>
                        <Stack direction="vertical" gap={3}>
                            {comments}
                        </Stack>
                    </>
                :
                    <BlogForm 
                        blog={blog} 
                        mode="edit" 
                        setEdit={setEdit}
                        setBlog={setBlog} 
                    />
            }
        </>
        :
        null
    )
}

export default Blog