import React, { useEffect, useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

function Comment({blog, setBlog, comment}){
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState('')
    const [error, setError] = useState(null)
    const {REACT_APP_BACKEND_URL} = process.env
    const [editStyle, setEditStyle] = useState({color: 'black'})
    const [deleteStyle, setDeleteStyle] = useState({color: 'black'})
    const user = useSelector(state => state.user)

    useEffect(()=>{
        setText(comment.body)
    }, [comment])
    
    function handleEditClick(){
        setEdit(!edit)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!text || text.length <= 0){
            setError("You can't set a comment to empty")
        }
        else{
            fetch(`${REACT_APP_BACKEND_URL}/comments/${comment.id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({body: text})
            })
            .then((data)=>{
                if(data.ok){
                    return data.json()
                }
            })
            .then((ret)=>{
                setText('')
                setEdit(false)
                setEditStyle({color: 'black'})
                setBlog({...blog, comments: blog.comments.map((comment)=>{
                    if(comment.id === ret.id){
                        return ret
                    }
                    else{
                        return comment
                    }
                })})
            })
        }
    }

    function handleDelete(){
        fetch(`${REACT_APP_BACKEND_URL}/comments/${comment.id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(()=>{
            setBlog({...blog, comments: blog.comments.filter((item)=>item.id!==comment.id)})
        })
    }

    return(
        <Card>
            <Card.Header>
                <Stack direction="horizontal" gap={3}>
                    <p>{`${comment.user.firstname} ${comment.user.lastname}`}</p>
                    {
                        user.admin || user.id === comment.user.id ?
                            <>
                                <FaEdit 
                                    className="ms-auto"
                                    onClick={handleEditClick}
                                    style={editStyle}
                                    onMouseEnter={()=>!edit?setEditStyle({color: 'blue'}):setEditStyle({color: 'black'})}
                                    onMouseLeave={()=>!edit?setEditStyle({color: 'black'}):setEditStyle({color: 'blue'})}
                                />
                                <FaTrashAlt 
                                    onClick={handleDelete}
                                    style={deleteStyle}
                                    onMouseEnter={()=>setDeleteStyle({color: 'red'})}
                                    onMouseLeave={()=>setDeleteStyle({color: 'black'})}
                                />
                            </>
                        :
                        null
                    }
                </Stack>
            </Card.Header>
            <Card.Body>
                {
                    !edit ?
                        <Card.Text>{comment.body}</Card.Text>
                    :
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                as="textarea"
                                value={text}
                                onChange={(e)=>setText(e.target.value)}
                                isInvalid={!!error}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {error}
                            </Form.Control.Feedback>
                            <Button type="submit">Update</Button>
                        </Form>
                }
            </Card.Body>
            <Card.Footer>{`Created: ${comment.created_at}`}</Card.Footer>
        </Card>
    )
}

export default Comment