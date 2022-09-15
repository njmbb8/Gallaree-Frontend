import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update, addNew } from "../../slices/Arts"
import { setError } from "../../slices/Error"
import './ArtForm.css'

function ArtForm({statuses, mode, setEdit}){
    const params = useParams()
    const arts = useSelector(state => state.arts)
    const dispatch = useDispatch()
    const art = arts.find((art) => parseInt(params.id) === art.id)
    const [form, setForm] = useState(mode === 'edit' ? art : {})
    const [errors, setErrors] = useState({})
    const { REACT_APP_BACKEND_URL } = process.env
    const placeHolderURL = mode !== 'edit' ? `${REACT_APP_BACKEND_URL }/images/Placeholder.svg` : `${REACT_APP_BACKEND_URL }${art.photo}`
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
        const { title, price, status_id, photo, length, height, weight, width} = form
        const foundErrors = {}

        if(!title || title === '') foundErrors.title = 'Give it a title!'

        if(!photo ) foundErrors.photo = 'Show it to the people!'
        
        if((!price || price <= 0) && status_id !== 1) foundErrors.price = 'Set a Price!'

        if(!status_id || status_id === 0) foundErrors.status_id = 'Pick a status for the art'

        if((!length || length <= 0)) foundErrors.length = 'Set a legnth!'

        if((!height || height <= 0)) foundErrors.height = 'Set a height!'

        if((!weight || weight <= 0)) foundErrors.weight = 'Set a weight!'

        if((!width || width <= 0)) foundErrors.width = 'Set a width!'

        return foundErrors
    }

    const statusOptions = statuses.map((status) => {
        return <option key={status.id} value={status.id}>{status.name}</option>
    })

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
            formData.append('title', form['title'])
            formData.append('description', form['description'])
            formData.append('price', form['price'])
            formData.append('status_id', form['status_id'])
            formData.append('quantity', form['quantity'])
            formData.append('length', form['length'])
            formData.append('height', form['height'])
            formData.append('width', form['width'])
            formData.append('weight', form['weight'])
            if(changePhoto) formData.append('photo', form['photo'])
    
            if(mode === 'upload'){
                fetch(`${REACT_APP_BACKEND_URL }/arts`, {
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
                    navigate('/')
                    dispatch(addNew(ret))
                })
                .catch((error) => dispatch(setError(error)))
            }
            else if(mode === 'edit'){
                fetch(`${REACT_APP_BACKEND_URL }/arts/${art.id}`, {
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
                    navigate('/')
                    dispatch(update(ret))
                })
                .catch((error) => dispatch(setError(error)))
            }
        }
    }

    function cancelEdit(e){
        e.preventDefault()
        setEdit(false)
    }

    

    return (
        <>
            <h1>{mode.charAt(0).toUpperCase() + mode.slice(1)} an art!</h1>
            <Image src={!changePhoto ? placeHolderURL : URL.createObjectURL(form['photo'])} thumbnail={true}/>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control 
                        accept={"image/*"} 
                        type="file" 
                        onChange={ photoChange }
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
                            value={form["title"]}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type="number" 
                            onChange={ e => setField('price', e.target.value)}
                            isInvalid={!!errors.price}
                            value={form["price"]}    
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
                            value={form["status_id"]}
                        >
                            <option value={0}>Select a Status</option>
                            {statusOptions}
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>
                            {errors.status_id}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={e => setField('quantity', e.target.value)}
                            isInvalid={!!errors.quantity}
                            value={form["quantity"]}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.quantity}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Length</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={e => setField('length', e.target.value)}
                            isInvalid={!!errors.length}
                            value={form["length"]}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.length}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Height</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={e => setField('height', e.target.value)}
                            isInvalid={!!errors.length}
                            value={form["height"]}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.height}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Width</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={e => setField('width', e.target.value)}
                            isInvalid={!!errors.width}
                            value={form["width"]}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.width}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={e => setField('weight', e.target.value)}
                            isInvalid={!!errors.length}
                            value={form["weight"]}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.weight}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        value={form['description']} 
                        onChange={ e => setField('description', e.target.value)} 
                        rows={3} 
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
                {mode === 'edit' ? <Button variant="danger" onClick={cancelEdit}>Cancel</Button> : null}
            </Form>
        </>
    )
}

export default ArtForm