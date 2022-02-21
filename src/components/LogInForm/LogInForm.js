import React, {useState} from "react";
import { Form, Button, Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authenticate } from "../../slices/User";

function LogInForm({showSignIn, setShowSignIn}){
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const { REACT_APP_BACKEND_URL } = process.env
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
        const {email, password} = form
        const foundErrors =  {}

        if(!email || email === '') foundErrors.email = "Email is mandatory"

        if(!password || password === '') foundErrors.password = "Password is mandatory"

        return foundErrors
    }

    function handleSubmit(e){
        e.preventDefault()
        const foundErrors = findErrors()

        if( Object.keys(foundErrors).length > 0){
            setErrors(foundErrors)
        }
        else{
            const formData = new FormData()
            formData.append('email', form['email'])
            formData.append('password', form['password'])
    
            fetch(`${REACT_APP_BACKEND_URL }/login`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            .then((data) => data.json())
            .then((ret) => dispatch(authenticate(ret)))
        }
    }

    return(
        <>
            <Offcanvas 
                show={showSignIn} 
                onHide={() => setShowSignIn(!showSignIn)}
                placement="end"    
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Log-In</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control 
                                type="text"
                                onChange={e => setField('email', e.target.value)}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                onChange={e => setField('password', e.target.value)}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default LogInForm