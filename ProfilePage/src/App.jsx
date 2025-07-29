import { useState } from 'react'
import './App.css';
import Navbar from './components/navbar';
import ProfilePage from "./pages/profilePage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <ProfilePage/>
    </>
  )
}

export default App;
  