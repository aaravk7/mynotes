import React, { useContext, useState } from 'react';
import { NavLink } from "react-router-dom";
import UserContext from '../../context/UserContext/UserContext';
import NoteContext from '../../context/NoteContext/NoteContext';
import './Navbar.css';

const NavbarComponent = () => {
    const noteC = useContext(NoteContext);
    const userC = useContext(UserContext);
    const [searchInput, setSearchInput] = useState("");

    const inputHandler = (e) => {
        setSearchInput(e.target.value);
    }

    const showResults = (e) => {
        e.preventDefault();
        noteC.setSearchInput(searchInput);
    }

    return (
        <nav className="notes-nav">
            <div className="search-bar">
                {!localStorage.getItem("token") ? "" :
                    <form onSubmit={showResults}>
                        <i className="fa-solid fa-magnifying-glass" onClick={showResults}></i>
                        <input type="text" placeholder='Search' value={searchInput} onChange={inputHandler} />
                    </form>
                }
            </div>
            {!localStorage.getItem("token") ? "" :
                <div className="nav-mid">
                    Hi ! {localStorage.getItem("userName")}
                </div>
            }
            <div>
                {
                    !localStorage.getItem("token") ?
                        <div className='nav-btns'>
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                        </div> :
                        <div>
                            <a style={{ cursor: "pointer" }} className="nav-link" onClick={() => userC.signOut()}>Logout</a>
                        </div>
                }
            </div>
        </nav>
    )
}

export default NavbarComponent