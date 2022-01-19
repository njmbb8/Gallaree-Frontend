import React from "react";
import { NavbarData } from "./NavbarData";
import { Container, Nav, Navbar } from "react-bootstrap";

function Navigation(){
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation