import React, {useState} from "react";
import { Form, Button, Offcanvas, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authenticate } from "../../../slices/User";
import { setError } from "../../../slices/Error"

function LogInForm({showSignIn, setShowSignIn}){
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const { REACT_APP_BACKEND_URL } = process.env
    const dispatch = useDispatch()
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showFailureAlert, setShowFailureAlert] = useState(false)

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
                setShowSignIn(false)
            })
            .catch((error) => dispatch(setError(error)))
        }
    }

    function forgotPassword(e){
        e.preventDefault()

        if(!form['email'] || form['email'] === ''){
            setError({email: 'E-mail is required to set password'})
        }
        else{
            fetch(`${REACT_APP_BACKEND_URL}/reset_password`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: form['email']})
            })
            .then((data)=>{
                if(data.ok){
                    setShowSuccessAlert(true)
                }
                else{
                    setShowFailureAlert(true)
                }
            })
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
                    <Alert variant="success" show={showSuccessAlert}>Password reset email successfully sent!</Alert>
                    <Alert variant="danger" show={showFailureAlert}>Password reset email could not be sent, please try again later.</Alert>
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
                        <Button variant="danger" onClick={forgotPassword}>Forgot Password?</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default LogInForm