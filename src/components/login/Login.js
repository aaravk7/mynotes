import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import UserContext from '../../context/UserContext/UserContext';

const Login = () => {
    const userC = useContext(UserContext);
    const [user, setUser] = useState({ email: "", password: "" });

    const inputHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const login = (e) => {
        e.preventDefault();
        userC.login(user);
    }

    return (
        <Container className='mt-5 shadow-sm p-5'>
            <h1 className='mb-3 text-center'>Login</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={inputHandler} value={user.email} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={inputHandler} value={user.password} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={login}>
                    Login
                </Button>
            </Form>
        </Container>
    )
}

export default Login