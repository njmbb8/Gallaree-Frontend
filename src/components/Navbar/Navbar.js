import React, {useState} from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from 'react-icons/ai'
import { NavbarData } from "./NavbarData";
import { Container, Nav, Navbar } from "react-bootstrap";
// import './sidebar.css';

function Navigation(){
    const [sidebar, setSidebar] = useState(false)

    function showSideBar(){
        setSidebar(!sidebar)
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation