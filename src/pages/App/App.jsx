import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/usersService';
// Pages
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
//Components
import NavBar from '../../components/NavBar/NavBar';
import LoginForm from '../../components/LoginForm/LoginForm';

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
      { user ? 
      <>
        <Routes>
          <Route path="orders/new" element ={<NewOrderPage />} />
          <Route path="orders" element ={<OrderHistoryPage />} />
        </Routes>      
      </>

      : 
      <>
        {showForm.login && <button onClick={changeForm}>Sign Up</button>}
        {showForm.signUp && <button onClick={changeForm}>Login</button>}
        {showForm.signUp && <AuthPage setUser={setUser}/>}
        {showForm.login && <LoginForm setUser={setUser}/>}
      </>
      }
    </main>
  );
}


