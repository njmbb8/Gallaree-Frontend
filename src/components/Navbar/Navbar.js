import React, {useState} from "react";
import { Container, Nav, Navbar} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import LogInForm from "./LogInForm/LogInForm";
import OrderDisplay from "./OrderDisplay/OrderDisplay";
import { signOut } from "../../slices/User"
import { useNavigate } from "react-router-dom";
import { setError } from "../../slices/Error"

function Navigation(){
    const { REACT_APP_BACKEND_URL } = process.env
    const user = useSelector(state => state.user)
    const [ showRegister, setShowRegister ] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)
    const [showOrder, setShowOrder] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function expandRegister(e){
        e.preventDefault()
        setShowRegister(!showRegister)
    }

    function expandSignIn(e){
        e.preventDefault()
        setShowSignIn(!showSignIn)
    }

    function expandOrder(e){
        e.preventDefault()
        setShowOrder(!showOrder)
    }

    function handleSignOut(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/logout`, {
            credentials: 'include',
            method: "DELETE"
        })
        .then((data) => {
            if(!data.ok){
                dispatch(setError("Ran into a problem while signing you out"))
            }
            else{
                navigate('/')
                dispatch(signOut())
            }
        })
    }

    function goToUserPanel(e){
        e.preventDefault()
        navigate('/user')
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        Shai Prince Art
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link className="me-auto" href="/">Gallery</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/blog">Blog</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                            {user && user.admin ? <Nav.Link href="/adminpanel">Admin</Nav.Link> : null}
                        </Nav>
                        <Nav className="ms-auto">
                            {Object.entries(user).length > 0 ? 
                                <> 
                                    <Navbar.Text>Hello</Navbar.Text>
                                    <Navbar.Text 
                                        onClick={!user.admin ? goToUserPanel : null}
                                        onMouseOver={(e) => e.target.style.cursor = (!user.admin ? 'pointer' : 'default')}   
                                    >
                                            {`, ${user.firstname} ${user.lastname}`}
                                    </Navbar.Text>
                                    {!user.admin ? <Navbar.Text onMouseOver={(e)=> e.target.style.cursor = 'pointer'} onClick={expandOrder}>({user.active_order.order_items.length})</Navbar.Text> : null}
                                    <Nav.Link href={'/#'} onClick={handleSignOut} >Sign Out</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link href={'/#'} onClick={expandRegister} >Sign Up</Nav.Link>
                                    <Nav.Link href={'/#'} onClick={expandSignIn} >Sign In</Nav.Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <LogInForm 
                setShowSignIn={setShowSignIn} 
                showSignIn={showSignIn}
            />
            <RegistrationForm 
                showRegister={showRegister} 
                setShowRegister={setShowRegister}
            />
            {Object.keys(user).length > 0?
                <OrderDisplay 
                    showOrder={showOrder}
                    setShowOrder={setShowOrder}
                />
                :
                null
            }
        </>
    )
}

export default Navigation