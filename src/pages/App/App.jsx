import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/usersService';

import * as classAPI from '../../utilities/classesApi'

// Pages
import HomePage from '../HomePage/HomePage'
import GuidePage from '../GuidePage/GuidePage'
import ClassDetails from '../ClassDetailsPage/ClassDetails'
import ShoppingCartPage from '../ShoppingCartPage/ShoppingCartPage'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';

//Components
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [classes, setClasses] = useState([]);
  let categories = ['Sports','Music','Painting','Ceramics','Dance','Professional']

  async function getAllClasses() {
    const classes = await classAPI.getAll();
    setClasses(classes);
  }

  async function searchClasses(searchInput) {

    let searchedClasses = []
    if (searchInput.length === 0) {
      getAllClasses()
    } else {
      searchedClasses = classes.filter(klass => klass.name.toLowerCase().includes(searchInput.toLowerCase()))
      setClasses(searchedClasses)
    }

  }

  return (
  <main className="App">
    <NavBar user={ user } setUser={setUser} searchClasses={searchClasses}/>
    <>
      <Routes>
        <Route path="/" element={<HomePage getAllClasses={getAllClasses} classes={classes} 
        user={ user } categories={categories} setClasses={setClasses}/>} /> 
        <Route path="/guiding" element={<GuidePage categories={categories} user={user} setUser={setUser}/>} /> 
        <Route path="/class/:id" element={<ClassDetails user={ user } categories={categories}/>} /> 
        <Route path="/history" element={<OrderHistoryPage user={ user } categories={categories}/>} /> 
        <Route path="/shoppingCart" element={<ShoppingCartPage user={ user } categories={categories}/>} /> 
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


