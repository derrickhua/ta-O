import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/usersService';
// Pages
import HomePage from '../HomePage/HomePage'
//Components
import NavBar from '../../components/NavBar/NavBar';

import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [showForm, setShowForm] = useState({
    signUp: false,
    login: true,
  })
  function changeForm(){
    if (showForm.signUp) {
      setShowForm({
        signUp: false,
        login: true
      })
    }
    else {
      setShowForm({
        signUp: true,
        login: false
      })
    }
  }
  return (
    <main className="App">
      <NavBar user={ user } setUser={setUser}/>
      {/* if user is a customer then give ability to like/ add to cart / to purchase / to send messages/ edit profile}
      {/* if user is a seller then give ability to CRUD services / edit profile */}
      {/* ensure that logged in is required for certain routes */}
      {/* this just means that user or not they should be able to see the homepage
      they should be able to see details and profile of sellers and services */}
      { user ? 
      <>
        {user.isSeller && 
        <Routes>
          <Route path="/" element={<HomePage />} /> 
        </Routes>          
        }
        {!user.isSeller && 
        <Routes>
          <Route path="/" element={<HomePage />} /> 
        </Routes>          
        }
    
      </>

      : 
      <>
      <Routes>
        <Route path="/" element={<HomePage />} />        
      </Routes>

      </>
      }
    </main>
  );
}

        {/* {showForm.login && <button onClick={changeForm}>Sign Up</button>}
        {showForm.signUp && <button onClick={changeForm}>Login</button>}
        {showForm.signUp && <AuthPage setUser={setUser}/>}
        {showForm.login && <LoginForm setUser={setUser}/>} */}
