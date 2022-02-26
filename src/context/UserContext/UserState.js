import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../AlertContext/AlertContext';
import { useContext } from 'react';

const UserState = (props) => {
    const navigate = useNavigate();
    const alertC = useContext(AlertContext);

    const addUser = async (user) => {
        let url = "http://127.0.0.1:1000/auth/signup";
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        if (data.error) {
            alertC.showAlert(data.error, "danger");
            localStorage.removeItem("token");
        } else if (data.errors) {
            alertC.showAlert(data.errors[0].msg, "danger");
            localStorage.removeItem("token");
        } else {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.userName);
            navigate('/');
            alertC.showAlert("Registered successfully !", "success");
        }
    }


    const login = async (user) => {
        let url = "http://127.0.0.1:1000/auth/login";
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        if (data.error) {
            alertC.showAlert(data.error, "danger");
            localStorage.removeItem("token");
        } else if (data.errors) {
            alertC.showAlert(data.errors[0].msg, "danger");
            localStorage.removeItem("token");
        } else {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.userName);
            navigate('/');
            alertC.showAlert("Logged in successfully !", "success");
        }
    }

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate('/login');
        alertC.showAlert("Logged out successfully !", "success");
    }

    return (
        <UserContext.Provider value={{ addUser, login, signOut }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;