import React, {useState} from "react";
import { NavbarData } from "./NavbarData";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LogInForm from "../LogInForm/LogInForm";
import OrderDisplay from "../OrderDisplay/OrderDisplay";
import { signOut } from "../../slices/User"
import { useNavigate } from "react-router-dom";

function Navigation(){
    const { REACT_APP_BACKEND_URL } = process.env
    const user = useSelector(state => state.user)
    const order = useSelector( state => state.order )
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
        .then(() => dispatch(signOut()))
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
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-2">
                            {NavbarData.map((item, index) => {
                                return (
                                    <Nav.Link key={index} href={item.path}>{item.text}</Nav.Link>
                                )
                            })}
                            {Object.entries(user).length > 0 && !!order ?
                                <> 
                                    {user.admin?
                                        <Nav.Link href="/adminpanel">Admin</Nav.Link>
                                        :
                                        null
                                    }
                                    <Navbar.Text>Hello, </Navbar.Text>
                                    <Navbar.Text 
                                        onClick={!user.admin ? goToUserPanel : null}
                                        onMouseOver={!user.admin ? 'pointer' : 'default'}   
                                    >
                                            {user.firstname}
                                    </Navbar.Text>
                                    {!user.admin ? <Navbar.Text onClick={expandOrder}>({order.order_items.length})</Navbar.Text> : null}
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
            {!!order.id?
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