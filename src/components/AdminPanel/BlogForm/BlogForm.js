import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Image, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setError } from "../../../slices/Error";
import "./BlogForm.css"

function BlogForm({blog = {}, setBlog, mode, setEdit}){
    const dispatch = useDispatch()
    const params = useParams()
    const [form, setForm] = useState(mode === 'edit' ? blog : {})
    const [errors, setErrors] = useState({})
    const { REACT_APP_BACKEND_URL } = process.env
    const placeHolderURL = mode !== 'edit' ? `${REACT_APP_BACKEND_URL }/images/Placeholder.svg` : `${REACT_APP_BACKEND_URL }${blog.photo}`
    const [changePhoto, setChangePhoto ] = useState(false)
    const navigate = useNavigate()

    function setField(field, value){
        setForm({
            ...form,
            [field]: value
        })

        if( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    function findErrors(){
        const { body, title } = form
        const foundErrors = {}

        if(!title || title.length <= 0){
            foundErrors['title'] = "Your post needs a title!"
        }
        if(!body || body.length === 0){
            foundErrors['body'] = "Your blog needs a body!"
        }

        return foundErrors
    }

    function photoChange(e){
        setField('photo', e.target.files[0])
        setChangePhoto(true)
    }

    function handleSubmit(event){
        event.preventDefault()
        const foundErrors = findErrors()

        if( Object.keys(foundErrors).length > 0){
            setErrors(foundErrors)
        }
        else{
            const formData = new FormData()
            if(changePhoto) formData.append('photo', form['photo'])
            formData.append('title', form['title'])
            formData.append('body', form['body'])
            if(mode !== 'edit'){
                fetch(`${REACT_APP_BACKEND_URL }/blogs/`, {
                    method: 'POST',
                    body: formData,
                    credentials: "include"
                })
                .then((data) => {
                    if(!data.ok){
                        throw Error(data.json())
                    }
                    else{
                        return data.json()
                    }
                })
                .then((ret)=>{
                    navigate(`/blog/${ret.id}`)
                })
                .catch((error) => dispatch(setError(error)))
            }
            else{
                fetch(`${REACT_APP_BACKEND_URL }/blogs/${params.id}`, {
                    method: 'PUT',
                    body: formData,
                    credentials: "include"
                })
                .then((data) => {
                    if(!data.ok){
                        throw Error(data.json())
                    }
                    else{
                        return data.json()
                    }
                })
                .then((ret)=>{
                    setBlog(ret)
                    setEdit(false)
                })
                .catch((error) => dispatch(setError(error)))
            }
        }
    }

    function cancelEdit(e){
        e.preventDefault()
        setEdit(false)
    }

    return(
        <Container className="tabContainer">
            <h1>{mode.charAt(0).toUpperCase() + mode.slice(1)} a Post!</h1>
            <Row>
                <Col md={4}>
                    <Image src={!changePhoto ? placeHolderURL : URL.createObjectURL(form['photo'])} thumbnail={true}/>
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                accept={"image/*"} 
                                type="file" 
                                onChange={ photoChange }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={ e => setField('title', e.target.value)}
                                isInvalid={!!errors.title}
                                value={form["title"]}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Body</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                value={form['body']} 
                                onChange={ e => setField('body', e.target.value)} 
                                rows={3} 
                            />
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                        {mode === 'edit' ? <Button variant="danger" onClick={cancelEdit}>Cancel</Button> : null}
                    </Form>
                </Col>    
            </Row>
        </Container>
    )
}

export default BlogForm