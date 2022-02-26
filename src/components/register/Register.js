import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../context/UserContext/UserContext';
import userImg from '../user.png';

const Register = () => {
    const userC = useContext(UserContext);
    const [user, setUser] = useState({ name: "", email: "", password: "" });

    const inputHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const register = (e) => {
        e.preventDefault();
        userC.addUser(user);
    }
    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Create a New Account</h1>
                <h2>Or <b>login</b> if already registered.</h2>
            </div>
            <div className="login-card">
                <label>Name:</label>
                <input type="text" placeholder="Enter your Name" name="name" value={user.name} onChange={inputHandler} />
                <label>Email:</label>
                <input type="email" placeholder="Enter email" name="email" value={user.email} onChange={inputHandler} />
                <label>Password:</label>
                <input type="password" placeholder="Password" name="password" value={user.password} onChange={inputHandler} />
                <div className="login-buttons">
                    <button className='primary-btn' onClick={register}>Sign Up</button>
                    <NavLink className='secondary-btn' to="/login">Already Registered ?</NavLink>
                </div>
                <div className="logincard-img">
                    <img src={userImg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Register