import React, { useContext, useState } from 'react';
import UserContext from '../../context/UserContext/UserContext';
import './Login.css';
import { NavLink } from 'react-router-dom';
import userImg from '../user.png';

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
        <div className="login-container">
            <div className="login-header">
                <h1>Let's get started now!</h1>
                <h2>Or <b>create an account</b> if not registered yet.</h2>
            </div>
            <div className="login-card">
                <label>Email:</label>
                <input type="email" placeholder="Enter email" name="email" onChange={inputHandler} value={user.email} />
                <label>Password:</label>
                <input type="password" placeholder="Password" name="password" onChange={inputHandler} value={user.password} />
                <div className="login-buttons">
                    <button className='primary-btn' onClick={login}>Sign In</button>
                    <NavLink className='secondary-btn' to="/register">Not Registered Yet ?</NavLink>
                </div>
                <div className="logincard-img">
                    <img src={userImg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login