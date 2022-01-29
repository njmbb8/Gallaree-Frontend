import React from "react";
import { NavbarData } from "./NavbarData";
import { Container, Nav, Navbar } from "react-bootstrap";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LogInForm from "../LogInForm/LogInForm";

function Navigation({ user, setUser, showSignIn, setShowSignIn, showRegister, setShowRegister }){

    const { REACT_APP_BACKEND_URL } = process.env

    function expandRegister(e){
        e.preventDefault()
        setShowRegister(!showRegister)
    }

    function expandSignIn(e){
        e.preventDefault()
        setShowSignIn(!showSignIn)
    }

    function signOut(e){
        e.preventDefault()
        fetch(`${REACT_APP_BACKEND_URL}/logout`, {
            credentials: 'include',
            method: "DELETE"
        })
        .then(() => setUser(null))
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
                            {!!user ?
                                <> 
                                    <Navbar.Text>Hello, {user.firstname}</Navbar.Text>
                                    <Nav.Link href="/upload">Upload</Nav.Link>
                                    <Nav.Link href={'/#'} onClick={signOut} >Sign Out</Nav.Link>
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
                setUser={setUser}
            />
            <RegistrationForm 
                showRegister={showRegister} 
                setShowRegister={setShowRegister}
                setUser={setUser}
            />
        </>
    )
}

export default Navigation