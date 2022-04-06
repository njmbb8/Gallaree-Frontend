import React, {useState} from "react";
import { Form, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { States } from "../../States";
import { useDispatch } from "react-redux";
import { authenticate } from "../../slices/User";

function RegistrationForm({ showRegister, setShowRegister }){

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const { REACT_APP_BACKEND_URL } = process.env

    const stateOptions = States.map((state, index) => {
        return <option key={index} value={state["alpha-2"]}>{state["alpha-2"]}</option>
    })

    function findErrors(){
        const { email, firstname, lastname, addr1, city, zip, state, password, password_confirmation} = form
        const foundErrors = {}
        
        if(!email || email === '') foundErrors.email = "Email is mandatory"

        if(!firstname || firstname === '') foundErrors.firstname = "First name is mandatory"
        
        if(!lastname || lastname === '') foundErrors.lastname = "Last name is Mandatory"
        
        if(!addr1 || lastname === '') foundErrors.addr1 = "Address is mandatory"
        
        if(!city || city === '') foundErrors.city = "City is mandatory"
        
        if(!zip || zip === ''){
            foundErrors.zip = "ZIP is mandatory"
        }
        else if(isNaN(zip) || zip.length !== 5){
            foundErrors.zip = "ZIP must be a 5 digit number"
        }

        if(!state || state === '') foundErrors.state = "Pick a State!"

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
            const formData = {
                "user": {
                    "email": form['email'],
                    "firstname": form['firstname'],
                    "lastname": form['lastname'],
                    "addresses_attributes": [{
                        "address_line1": form['addr1'],
                        "address_line2": form['addr2'],
                        "city": form['city'],
                        "state": form['state'],
                        "postal_code": form["zip"],
                        "country": form["country"]
                    }],
                    "password": form['password'],
                    "password_confirmation": form['password_confirmation']
                }
            }



            fetch(`${REACT_APP_BACKEND_URL }/register`, {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(formData)
            })
            .then((data) => data.json())
            .then((ret) => dispatch(authenticate(ret)))
        }
    }

    return(
        <>
            <Offcanvas show={showRegister} onHide={() => setShowRegister(!showRegister)} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Register</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={handleSubmit}>
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
                            <Form.Group>
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setField('email', e.target.value)}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback>
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={8}>
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setField('addr1', e.target.value)}
                                    isInvalid={!!errors.addr1}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.addr1}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}  xs={4}>
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control 
                                    type="text"
                                    onChange={e => setField('addr2', e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e=> setField('city', e.target.value)}
                                    isInvalid={!!errors.city}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.city}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    onChange={e => setField('state', e.target.value)}
                                    isInvalid={!!errors.state}
                                >
                                    {stateOptions}
                                </Form.Select>
                                <Form.Control.Feedback>
                                    {errors.state}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>ZIP</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setField('zip', e.target.value)}
                                    isInvalid = {!!errors.zip}
                                />
                                <Form.Control.Feedback>
                                    {errors.zip}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setField('country', e.target.value)}
                                    isInvalid = {!!errors.country}
                                />
                                <Form.Control.Feedback>
                                    {errors.zip}
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