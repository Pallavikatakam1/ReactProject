import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './FormPages/Login';
import Signup from './FormPages/Signup';
import ForgotPassword from './FormPages/ForgotPassword';
import ResetPassword from './FormPages/ResetPassword';
import Home from './FormPages/Home';
import Welcome from './FormPages/Welcome';

const App = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Signup" element={<Signup />} />
    <Route path="/ForgotPassword" element={<ForgotPassword />} />
    <Route path="/ResetPassword" element={<ResetPassword />} />
    <Route path="/Home" element={<Home />} />
  </Routes>
);

export default App;