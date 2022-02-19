import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";
import UserContext from '../../context/UserContext/UserContext';

const NavbarComponent = () => {
    const userC = useContext(UserContext);
    return (
        <Navbar bg="dark" variant="dark" className='px-5'>
            <Navbar.Brand href="#home">My Notes App</Navbar.Brand>
            <Nav className="me-auto">
                <NavLink className="nav-link" to="/">Home</NavLink>
            </Nav>
            {
                !localStorage.getItem("token") ?
                    <Nav>
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </Nav> :
                    <Nav>
                        <a style={{ cursor: "pointer" }} className="nav-link" onClick={() => userC.signOut()}>Logout</a>
                    </Nav>
            }
        </Navbar>
    )
}

export default NavbarComponent