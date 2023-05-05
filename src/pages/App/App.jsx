import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/usersService';

import * as classAPI from '../../utilities/classesApi'

// Pages
import HomePage from '../HomePage/HomePage'
import GuidePage from '../GuidePage/GuidePage'
import ClassDetails from '../ClassDetailsPage/ClassDetails'
import ShoppingCartPage from '../ShoppingCartPage/ShoppingCartPage'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import AccountDetailsPage from '../AccountDetailsPage/AccountDetails';
import MessengerPage from '../MessengerPage/MessengerPage';
//Components
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [classes, setClasses] = useState([]);
  const [searched, setSearched] = useState([])
  let categories = ['Sports','Music','Painting','Ceramics','Dance','Professional']


  async function getAllClasses() {
    const classes = await classAPI.getAll();
    setClasses(classes);
  }

  async function setUpdateUser() {
    setUser(getUser())
  }

  async function searchClasses(searchInput) {

    let searchedClasses = []
    setSearched(searchInput)
    if (searchInput.length === 0) {
      getAllClasses()
    } else {
      searchedClasses = await classes.filter(klass => klass.name.toLowerCase().includes(searchInput.toLowerCase()))
      await setClasses(searchedClasses)
    }

  }

  return (
  <main className="App">
    <NavBar user={ user } setUser={setUser} searchClasses={searchClasses}/>
    <>
      <Routes>
        <Route path="/" element={<HomePage searched={searched} getAllClasses={getAllClasses} classes={classes} 
        user={ user } categories={categories} setClasses={setClasses}/>} /> 
        <Route path="/guiding" element={<GuidePage categories={categories} user={user} setUser={setUser}/>} /> 
        <Route path="/class/:id" element={<ClassDetails user={ user } categories={categories}/>} /> 
        <Route path="/history" element={<OrderHistoryPage user={ user } categories={categories}/>} /> 
        <Route path="/account" element={<AccountDetailsPage user={ user } setUser={setUser}/>} /> 
        <Route path="/shoppingCart" element={<ShoppingCartPage user={ user } categories={categories}/>} /> 
        <Route path="/messages" element={<MessengerPage user={ user } />} /> 
        {/* <Route path="/history" element={<HistoryPage />} />
        <Route path="/account" element={<AccountSettingsPage />} /> 
        <Route path="/wishlist" element={<WishListPage />} /> 
        <Route path="/profile" element={<ProfilePage />} />  */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>    
    </>
  </main>
  );
}


