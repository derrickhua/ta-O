import { NavLink } from "react-router-dom";
import * as userService from '../../utilities/usersService'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './NavBar.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpForm/SignUpModal"

export default function NavBar({ user, setUser }) {
    const [showModal, setShowModal] = useState({
        login: false,
        signUp: false
    });
    const navigate = useNavigate();
    function handleLogClose() {
        setShowModal({
            login:false, signUp: false
        });
    }  
    function handleLogShow(){
        setShowModal({
            login:true, signUp: false
        });
    }  
    function handleSUClose() {
        setShowModal({
            login:false, signUp: false
        });
    }  
    function handleSUShow(){
        setShowModal({
            login:false, signUp: true
        });
    }  
    function redirectHomePage(){
        navigate(`/`)
    }
    function handleLogOut() {
        userService.logOut();
        navigate(`/`)
        setUser(null);
        
    }

    function logUser() {
        console.log(user)
    }
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
                <span >
                {user && <> Welcome, {user.name}</>}
                {user && <>&nbsp; | &nbsp;</>}      
                </span>
                <span >
                {user && <> Shopping Cart</>}
                {user && <>&nbsp; | &nbsp;</>}     
                </span>
                <span >
                {/* {somethinginShoppingCart && <>Future Shopping Cart</>}
                &nbsp; | &nbsp;      */}
                {user && <NavLink to="/guiding">Switch to Guiding</NavLink>
                }   
                {user && <>&nbsp; | &nbsp;</>}  
                </span>
                <span>
                <DropdownButton id="dropdown-basic-button" title="Profile">
                    {!user && <Dropdown.Item onClick={handleLogShow}>Log In</Dropdown.Item>}
                    {!user && <Dropdown.Item onClick={handleSUShow}>Sign Up</Dropdown.Item>}
                    {user && <Dropdown.Item>Account</Dropdown.Item>}
                    {user && <Dropdown.Item>Manage Classes</Dropdown.Item>}
                    <Dropdown.Item onClick={logUser}>Help</Dropdown.Item>
                    {user && <Dropdown.Item onClick={handleLogOut}>LogOut</Dropdown.Item>}
                </DropdownButton>
                </span>
                <LoginModal show={showModal.login} handleClose={handleLogClose} handleShow={handleLogShow} setUser={setUser} redirectHomePage={redirectHomePage}/>
                <SignUpModal show={showModal.signUp} handleClose={handleSUClose} handleShow={handleSUShow} setUser={setUser} redirectHomePage={redirectHomePage}/>
            </nav>
        </>

    );
}