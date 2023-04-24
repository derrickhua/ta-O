import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/usersService';

// Pages
import HomePage from '../HomePage/HomePage'
import GuidePage from '../GuidePage/GuidePage'
import ClassDetails from '../ClassDetailsPage/ClassDetails'

//Components
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  let categories = ['Sports','Music','Painting','Ceramics','Dance','Professional']
  

  return (
  <main className="App">
    <NavBar user={ user } setUser={setUser}/>
    {/* if user is a customer then give ability to like/ add to cart / to purchase / to send messages/ edit profile}
    {/* if user is a seller then give ability to CRUD services / edit profile */}
    {/* ensure that logged in is required for certain routes */}
    {/* this just means that user or not they should be able to see the homepage
    they should be able to see details and profile of sellers and services */}
    <>
      <Routes>
        <Route path="/" element={<HomePage user={ user } categories={categories}/>} /> 
        <Route path="/guiding" element={<GuidePage categories={categories} user={user} setUser={setUser}/>} /> 
        <Route path="/class/:id" element={<ClassDetails user={ user } categories={categories}/>} /> 
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


