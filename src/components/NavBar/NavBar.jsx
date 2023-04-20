import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import * as userService from '../../utilities/usersService'
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import Modal from '../Modal/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './NavBar.css'
import { useState, useEffect } from "react";
import MyModal from "../Modal/Modal";

export default function NavBar({ user, setUser }) {
    const [showModal, setShowModal] = useState(false);

    function handleClose() {
        setShowModal(false);
    }  
    function handleShow(){
        setShowModal(true);
    }  
    // function handleLogOut() {
    //     // Delegate to the users-service
    //     userService.logOut();
    //     // Update state will also cause a re-render
    //     setUser(null);
    // }
    return (
        <>
            <nav>
                <span>
                <NavLink to="/">TA-O</NavLink>    
                </span>
                &nbsp; | &nbsp;            
                <span>
                FUTURE SEARCH BAR
                </span>
                &nbsp; | &nbsp;            
                <span>
                {user && <p> Welcome, {user.name}</p>}
                &nbsp; | &nbsp; 
                <DropdownButton id="dropdown-basic-button" title="Profile">
                    <Dropdown.Item onClick={handleShow}>Log In</Dropdown.Item>
                    <Dropdown.Item>Sign Up</Dropdown.Item>
                    <Dropdown.Item>Help</Dropdown.Item>
                    {user && <Dropdown.Item>LogOut</Dropdown.Item>}
                </DropdownButton>
                </span>
                <MyModal show={showModal} handleClose={handleClose} handleShow={handleShow}/>
            </nav>
        </>

    );
}