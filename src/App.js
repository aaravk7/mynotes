import React from 'react';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import NoteState from './context/NoteContext/NoteState';
import UserState from './context/UserContext/UserState';
import Alert from './components/alert/Alert';
import AlertState from './context/AlertContext/AlertState';

const App = () => {
  return (
    <AlertState>
      <UserState>
        <NoteState>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </NoteState>
      </UserState>
    </AlertState>
  )
}

export default App
