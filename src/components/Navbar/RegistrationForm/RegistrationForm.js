import React, {useState} from "react";
import { Form, Row, Col, Button, Offcanvas, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authenticate } from "../../../slices/User";

function RegistrationForm({ showRegister, setShowRegister }){

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState([])
    const [message, setMessage] = useState({})
    const dispatch = useDispatch()
    const { REACT_APP_BACKEND_URL } = process.env

    function findErrors(){
        const { email, 
                firstname, 
                lastname,
                password, 
                password_confirmation} = form
        const foundErrors = {}
        
        if(!email || email === '') foundErrors.email = "Email is mandatory"

        if(!firstname || firstname === '') foundErrors.firstname = "First name is mandatory"
        
        if(!lastname || lastname === '') foundErrors.lastname = "Last name is Mandatory"

        if(!password || password === ''){
            foundErrors.password = "Password is mandatory"
        }
        else if(password !== password_confirmation){
            foundErrors.password = foundErrors.password_confirmation = "Password and confirmation do not match"
        }

        if(!password_confirmation || password_confirmation === '') foundErrors.password_confirmation = "Confirm your password"

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
            fetch(`${REACT_APP_BACKEND_URL }/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            .then((data) => {
                if(!data.ok){
                    throw Error()
                }
                else{
                    return data.json()
                }
            })
            .then((ret) => {
                dispatch(authenticate(ret))
                setMessage({text: "Your account has been successfully created, please check your inbox for a confirmation email.", variant: "success"})
            })
            .catch(() => {
                setMessage({text: "An error has occurred creating your account, please try again later.", variant:"danger"})
            })
        }
    }

    return(
        <>
            <Offcanvas show={showRegister} onHide={() => setShowRegister(!showRegister)} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Register</Offcanvas.Title>
                </Offcanvas.Header>
                {
                    <Alert
                        show={Object.keys(message).length > 0}
                        variant={message.variant}
                        onClose={()=>setMessage({})}
                        dismissible
                    >
                        {message.text}
                    </Alert>
                }
                <Offcanvas.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <h5>User Info:</h5>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    onChange={e => setField('firstname', e.target.value)}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    onChange={e => setField('lastname', e.target.value)}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control
                                    type="email"
                                    onChange={e => setField('email', e.target.value)}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback>
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Phone #:</Form.Label>
                                <Form.Control
                                    type="tel"
                                    onChange={e => setField('phone', e.target.value)}
                                    isInvalid={!!errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={e => setField('password', e.target.value)}
                                    isInvalid = {!!errors.password}
                                />
                                <Form.Control.Feedback>
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control 
                                    type="password"
                                    onChange={e => setField('password_confirmation', e.target.value)}
                                    isInvalid={!!errors.password_confirmation}
                                />
                                <Form.Control.Feedback>
                                    {errors.password_confirmation}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Row>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default RegistrationForm