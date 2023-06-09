// important utilities
import * as userService from '../../utilities/usersService'
import * as classAPI from '../../utilities/classesApi'
// important functions
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// CSS File
import './NavBar.css'

// BootStrap Css Components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


// Components
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpForm/SignUpModal"
import BCModal from "../BookedClassModal/BCModal"


export default function NavBar({ user, setUser, searchClasses }) {
    const [showModal, setShowModal] = useState({
        login: false,
        signUp: false,
        bookedClasses: false
    });

    const [searchInput, setSearchInput] = useState('');
    const [bookedClasses, setBClasses] = useState([])
    const [classList, setClassList] = useState(null)    

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

    function handleBookShow(){
        setShowModal({
            login:false, signUp: false, bookedClasses: true
        });
    }  
    function handleBookClose(){
        setShowModal({
            login:false, signUp: false, bookedClasses: false
        });
    }  

    // Navigating everywhere
    function redirectHomePage(){
        navigate(`/`)
    }
    function redirectOrderHistory(){
        navigate(`/history`)
    }
    function redirectGuidePage(){
        navigate(`/guiding`)
    }
    function redirectShoppingCart(){
        navigate(`/shoppingCart`)
    }
    function redirectAccountDetails(){
        navigate(`/account`)
    }
    function redirectMessages(){
        navigate(`/messages`)
    }

    function handleLogOut() {
        userService.logOut();
        navigate(`/`)
        setUser(null);
    }

    function logUser() {
        console.log(user)
    }

    async function getMyClasses() {
        const classes = await classAPI.getBoughtByUser();
        setBClasses(classes)
        let classList = classes.map((klass) => <li>{klass.item.name} by {klass.item.username}</li>)
        setClassList(classList)  
    }

    useEffect(function() {
        if (user) {
            getMyClasses()           
        }
      }, []);

    function handleSearch(evt) {
        setSearchInput(evt.target.value)
    }

    async function search() {
        redirectHomePage()
        searchClasses(searchInput)
    }


      return (
        <>
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><NavLink to="/" className='brandLogo'>TA-O</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Form className="d-flex">
                        <Form.Control
                            name='searchBar' 
                            type="search"
                            placeholder="..."
                            className="me-2 search"
                            aria-label="Search"
                            onChange={handleSearch}
                            />
                            <button className='search searchBtn' onClick={search}>Search</button>
                    </Form>
                    {user && <NavLink to="/guiding" className='realNavLink'>Become a Guide</NavLink>} 
                    <NavDropdown title="Profile" id="basic-nav-dropdown" className='dropDon'>
                        {!user && <NavDropdown.Item onClick={handleLogShow}>Log In</NavDropdown.Item>}
                        {!user && <NavDropdown.Item onClick={handleSUShow}>Sign Up</NavDropdown.Item>}
                        {user && <NavDropdown.Item onClick={redirectAccountDetails}>Account</NavDropdown.Item>}
                        {user && <NavDropdown.Item onClick={redirectMessages}>Messages</NavDropdown.Item>}
                        {user && <NavDropdown.Item onClick={() => {
                            handleBookShow() 
                            getMyClasses()}}>Booked Classes</NavDropdown.Item>}
                        {user && <NavDropdown.Item onClick={redirectShoppingCart}>Shopping Cart</NavDropdown.Item>}
                        {user && <NavDropdown.Item onClick={redirectOrderHistory}>Order History</NavDropdown.Item>}
                        {user && <NavDropdown.Item onClick={redirectGuidePage}>Manage My Classes</NavDropdown.Item>}
                        <NavDropdown.Item onClick={logUser}>Help</NavDropdown.Item>
                        {user && <NavDropdown.Item onClick={handleLogOut}>LogOut</NavDropdown.Item>}
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <LoginModal show={showModal.login} handleClose={handleLogClose} handleShow={handleLogShow} setUser={setUser} redirectHomePage={redirectHomePage}/>
            <SignUpModal show={showModal.signUp} handleClose={handleSUClose} handleShow={handleSUShow} setUser={setUser} redirectHomePage={redirectHomePage}/>
            <BCModal show={showModal.bookedClasses} handleClose={handleBookClose} handleShow={handleBookShow} classList={classList}/>
        </>

    );
}