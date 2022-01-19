import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import './ArtUploadForm.css'

function ArtUploadForm({statuses}){
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const { REACT_APP_BACKEND_URL } = process.env

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
        const { title, price, status_id, photo } = form
        const foundErrors = {}

        if(!title || title === '') foundErrors.title = 'Give it a title!'

        if(!photo ) foundErrors.photo = 'Show it to the people!'
        
        if((!price || price <= 0) && status_id !== 1) foundErrors.price = 'Set a Price!'

        if(!status_id || status_id === 0) foundErrors.status_id = 'Pick a status for the art'

        return foundErrors
    }

    const statusOptions = statuses.map((status) => {
        return <option key={status.id} value={status.id}>{status.name}</option>
    })

    function handleSubmit(event){
        event.preventDefault()
        const foundErrors = findErrors()

        if( Object.keys(foundErrors).length > 0){
            setErrors(foundErrors)
        }
        else{
            const formData = new FormData()
            formData.append('title', form['title'])
            formData.append('description', form['description'])
            formData.append('price', form['price'])
            formData.append('status_id', form['status_id'])
            formData.append('photo', form['photo'])
    
            fetch(`${REACT_APP_BACKEND_URL }arts`, {
                method: 'POST',
                body: formData
            })
        }
    }

    return (
        <>
            <h1>Upload an art!</h1>
            <Image src={form['photo'] == null ? `${REACT_APP_BACKEND_URL }images/Placeholder.svg` : URL.createObjectURL(form['photo'])} thumbnail={true}/>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control 
                        accept={"image/*"} 
                        type="file" 
                        onChange={ e => setField('photo', e.target.files[0])}
                        isInvalid={!!errors.photo}
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.photo }
                    </Form.Control.Feedback>
                </Form.Group>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            onChange={ e => setField('title', e.target.value)}
                            isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type="number" 
                            onChange={ e => setField('price', e.target.value)}
                            isInvalid={!!errors.price}    
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Status</Form.Label>
                        <Form.Select 
                            onChange={ e => setField('status_id', e.target.value)}
                            isInvalid={!!errors.status_id}
                        >
                            <option value={0}>Select a Status</option>
                            {statusOptions}
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>
                            {errors.status_id}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" value={form['description']} onChange={ e => setField('description', e.target.value)} rows={3} />
                </Form.Group>
                <Button type="submit">Upload That Art!</Button>
            </Form>
        </>
    )
}

export default ArtUploadForm