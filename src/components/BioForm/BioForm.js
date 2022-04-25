import React, { useState } from "react";
import { Form, Image, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setBioInfo } from "../../slices/Bio"
import { setError } from "../../slices/Error"

function BioForm(){
    const {REACT_APP_BACKEND_URL} = process.env
    const bio = useSelector(state => state.bio)
    const placeHolderURL = `${REACT_APP_BACKEND_URL }/images/Placeholder.svg` //!!bio.photo ? `${REACT_APP_BACKEND_URL }/images/Placeholder.svg` : `${REACT_APP_BACKEND_URL}${bio.photo}`
    const [form, setForm] = useState({})//useState(bio === {} ? {} : bio)
    const [errors, setErrors] = useState({})
    const [changePhoto, setChangePhoto] = useState(false)
    const dispatch = useDispatch()

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
        const {artist_statement, biography, photo} = form
        const foundErrors = {}

        if(!artist_statement || artist_statement === ''){
            foundErrors.artist_statement = "You need an artist statement!"
        }

        if(!biography || biography === ''){
            foundErrors.biography = "You need a biography!"
        }

        if(!photo){
            foundErrors.photo = "You're going to want a photo"
        }

        return foundErrors
    }

    function photoChange(e){
        setField('photo', e.target.files[0])
        setChangePhoto(true)
    }

    function handleSubmit(e){
        e.preventDefault()
        const foundErrors = findErrors()

        if(Object.entries(foundErrors).length > 0){
            setErrors(findErrors)
        }
        else{
            const formData = new FormData()
            if(changePhoto) formData.append('photo', form['photo'])
            formData.append('artist_statement', form['artist_statement'])
            formData.append('biography', form['biography'])

            fetch(`${REACT_APP_BACKEND_URL}/bio`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            .then((data) => {
                if(!data.ok){
                    throw Error(data.json())
                }
                else{
                    return data.json()
                }
            })
            .then((ret) => dispatch(setBioInfo(ret)))
            .then((error) => dispatch((setError(error))))
        }
    }

    return(
        <>
            <h1>Edit Your Bio</h1>
            <Image src={!changePhoto ? placeHolderURL : URL.createObjectURL(form['photo'])} thumbnail />
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
                    <Form.Group>
                        <Form.Label>Biography</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            value={form['biography']} 
                            onChange={ e => setField('biography', e.target.value)} 
                            rows={3} 
                            isInvalid={!!errors.biography}
                        />
                        <Form.Control.Feedback type='invalid'>
                            { errors.biography }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Artist Statement</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            value={form['artist_statement']} 
                            onChange={ e => setField('artist_statement', e.target.value)} 
                            rows={3} 
                            isInvalid={!!errors.artist_statement}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.artist_statement}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">Submit</Button>
            </Form>
        </>
    )
}

export default BioForm