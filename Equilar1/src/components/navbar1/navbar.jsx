import React from 'react';
import './Navbar.css';
import profilePic from '../../assets/profile.jpg'; 
import logo from '../../assets/image.png';
import { FaAngleDown } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="ExecATLAS" />
      </div>
      <div className="navbar-profile">
        <img src={profilePic} alt="Profile" />
        <div className='down-arrow'><FaAngleDown /></div>
      </div>
    </div>
  );
};

export default Navbar;
