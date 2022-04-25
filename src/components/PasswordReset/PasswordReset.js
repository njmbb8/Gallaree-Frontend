import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../../slices/Error"

function PasswordReset(){
    const [form, setForm] = useState({})
    const [ errors, setErrors ] = useState({})
    const params = useParams()
    const { REACT_APP_BACKEND_URL } = process.env
    const dispatch = useDispatch()

    function findErrors(){
        const { password, password_confirmation } = form
        const foundErrors = {}

        if(!password || password === '') foundErrors.password = "Please input a new password"
        if(!password_confirmation || password_confirmation === '') foundErrors.password_confirmation = "Please confirm your password"
        if(password !== password_confirmation) foundErrors.password_confirmation = "Password and confirmation must match"

        return foundErrors
    }

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

    function handleSubmit(e){
        e.preventDefault()
        const foundErrors = findErrors()

        if( Object.keys(foundErrors).length > 0){
            setErrors(foundErrors)
        }
        else{
            const formData = new FormData()
            formData.append('password', form['password'])
            formData.append('password_confirmation', form['password_confirmation'])
            formData.append('token', params['token'])

            fetch(`${REACT_APP_BACKEND_URL}/reset_password`, {
                method: 'PATCH',
                body: formData
            })
            .then((data) => {
                if(!data.ok){
                    throw Error(data.json())
                }
            })
            .catch((error)=>dispatch(setError(error)))
        }
    }

    return(
        <>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={e => setField('password', e.target.value)}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={e => setField('password_confirmation', e.target.value)}
                                isInvalid={!!errors.password_confirmation}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password_confirmation}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </>
    )
}

export default PasswordReset