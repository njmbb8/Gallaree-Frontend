import React, {useState} from "react";
import { Form, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { States } from "../../States";
import { useDispatch } from "react-redux";
import { authenticate } from "../../slices/User";
import { setError } from "../../slices/Error"

function RegistrationForm({ showRegister, setShowRegister }){

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const { REACT_APP_BACKEND_URL } = process.env
    const [sameAsShipping, setSameAsShipping] = useState(true)
    const stateOptions = States.map((state, index) => {
        return <option key={index} value={state["alpha-2"]}>{state["alpha-2"]}</option>
    })

    function findErrors(){
        const { email, 
                firstname, 
                lastname, 
                billingAddr1, 
                billingCity,
                billingZip, 
                billingState,
                shippingAddr1, 
                shippingCity,
                shippingZip, 
                shippingState, 
                password, 
                password_confirmation} = form
        const foundErrors = {}
        
        if(!email || email === '') foundErrors.email = "Email is mandatory"

        if(!firstname || firstname === '') foundErrors.firstname = "First name is mandatory"
        
        if(!lastname || lastname === '') foundErrors.lastname = "Last name is Mandatory"
        
        if(!billingAddr1 || billingAddr1 === '') foundErrors.billingAddr1 = "Address is mandatory"
        
        if(!billingCity || billingCity === '') foundErrors.billingCity = "City is mandatory"
        
        if(!billingZip || billingZip === ''){
            foundErrors.billingZip = "ZIP is mandatory"
        }
        else if(isNaN(billingZip) || billingZip.length !== 5){
            foundErrors.billingZip = "ZIP must be a 5 digit number"
        }

        if(!billingState || billingState === '') foundErrors.billingState = "Pick a State!"

        if(!sameAsShipping){
            if(!shippingAddr1 || shippingAddr1 === '') foundErrors.billingAddr1 = "Address is mandatory"
            
            if(!shippingCity || shippingCity === '') foundErrors.billingCity = "City is mandatory"
            
            if(!shippingZip || shippingZip === ''){
                foundErrors.shippinZip = "ZIP is mandatory"
            }
            else if(isNaN(shippingZip) || shippingZip.length !== 5){
                foundErrors.shippingZip = "ZIP must be a 5 digit number"
            }

            if(!shippingState || shippingState === '') foundErrors.billingState = "Pick a State!"
        }

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
                body: JSON.stringify({...form, sameAsShipping: sameAsShipping})
            })
            .then((data) => {
                if(!data.ok){
                    throw Error(data.json())
                }
                else{
                    return data.json()
                }
            })
            .then((ret) => {
                dispatch(authenticate(ret))
                setShowRegister(false)
            })
            .catch((error) => dispatch(setError(error)))
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
                            <Col>
                                <h5>Billing Info:</h5>
                            </Col>
                            <Col>
                                <Form.Check
                                    type="switch"
                                    label="Same as Shipping?"
                                    onChange={(e) => setSameAsShipping(!sameAsShipping)}
                                    value={sameAsShipping}
                                    checked={sameAsShipping}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={8}>
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setField('billingAddr1', e.target.value)}
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
                                    onChange={e => setField('billingAddr2', e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e=> setField('billingCity', e.target.value)}
                                    isInvalid={!!errors.city}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.city}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    onChange={e => setField('billingState', e.target.value)}
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
                                    onChange={e => setField('billingZip', e.target.value)}
                                    isInvalid = {!!errors.zip}
                                />
                                <Form.Control.Feedback>
                                    {errors.zip}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        {!sameAsShipping ? 
                            <>
                                <Row>
                                    <h5>Shipping Info:</h5>
                                </Row>
                                <Row>
                            <Form.Group as={Col} xs={8}>
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setField('shippingAddr1', e.target.value)}
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
                                    onChange={e => setField('shippingAddr2', e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e=> setField('shippingCity', e.target.value)}
                                    isInvalid={!!errors.city}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.city}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    onChange={e => setField('shippingState', e.target.value)}
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
                                    onChange={e => setField('shippingZip', e.target.value)}
                                    isInvalid = {!!errors.zip}
                                />
                                <Form.Control.Feedback>
                                    {errors.zip}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                            </>
                            :
                            ''
                        }
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