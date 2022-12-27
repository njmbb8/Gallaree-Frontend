import React, {useState} from "react";
import { Button, Col, Container, Form, Row} from "react-bootstrap";
import { useSelector } from "react-redux";
import LoginAlert from "../Navbar/LogInForm/LoginAlert/LoginAlert";

function Contact(){
    const [contactForm, setContactForm] = useState({})
    const [errors, setErrors] = useState({})
    const [alerts, setAlerts] = useState([])
    const { REACT_APP_BACKEND_URL } = process.env
    const user = useSelector(state => state.user)


    function setField(field, value){
        setContactForm({
            ...contactForm,
            [field]: value
        })

        if( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    function validateEmail(email){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }

    function validatePhone(num){
        return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(num)
    }

    function findError(){
        const {name, phone, email, body} = contactForm
        const errors = {}

        if(!name||name.length === 0){
            errors['name'] = 'Please provide a name.'
        }
        if((!phone || phone.length === 0) && (!email || email.length)){
            errors['email'] = errors['phone'] = 'You must enter either a Phone # or e-mail.'
        }
        else{
            if(!validateEmail(email)){
                errors['email'] = 'Please enter a valid email'
            }
            if(!validatePhone(phone)){
                errors['phone'] = 'Please enter a vlaid phone number'
            }
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/conversations`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(contactForm)
        })
        .then((data)=>{
            if(data.ok){
                setAlerts([...alerts, {message: "Message Sent!", variant:"success"}])
            }
            else if(data.status > 399 && data.status < 500){
                data.json().then(ret => setAlerts([...alerts, {message: ret.error, variant:"danger"}]))
            }
            else{
                setAlerts([...alerts, {variant: 'danger', message: `There was an error sending the message: ${data.status}: ${data.statusText}`}])
            }
        })
    }

    const alertElements = alerts.map((alert)=>{
        return <LoginAlert variant={alert.variant} message={alert.message} />
    })

    return(
        <Container style={{height: "100%", width: "100%", "margin-top": "75px"}} className="d-flex align-items-center">
            <Row style={{height: "50%", width: "100%"}}>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <>
                            {alertElements}
                            {
                                !user.id ?
                                    <>
                                        <Form.Group>
                                            <Form.Label>Name:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={contactForm['recipient_name']}
                                                onChange={e=>setField('recipient_name', e.target.value)}
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Phone #:</Form.Label>
                                            <Form.Control 
                                                type="tel"
                                                value={contactForm['recipient_phone']}
                                                onChange={e=>setField('recipient_phone', e.target.value)}
                                                isInvalid={!!errors.phone}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>E-mail:</Form.Label>
                                            <Form.Control 
                                                type="email"
                                                value={contactForm['recipient_email']}
                                                onChange={e=>setField('recipient_email', e.target.value)}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </>
                                :
                                    null
                            }
                        </>
                        <Form.Group>
                            <Form.Label>Message:</Form.Label>
                            <Form.Control 
                                as="textarea"
                                value={contactForm['body']}
                                onChange={e=>setField('body', e.target.value)}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.body}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit">Send a Message</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact