import React from 'react';
import './Navbar.css';
import profilePic from '../assets/profile.jpg'; 
import logo from '../assets/companyLogo.png';
import { FaAngleDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";


const Navbar = () => {
  return (
    <div className="navbar">
      <div className='nav-div'>
        <div className="navbar-left"> 
          <div className="navbar-logo">
            <img src={logo} alt="ExecATLAS" />
          </div>
          <div className="search-bar">
            <input
             type="text"
             className="search-input"
             placeholder="Enter a Company or a Person"
            />
            <FaSearch className="search-icon" />        
          </div>
        </div>

        <div className='navbar-right'>
          <div className='navbar-text'>
          <div className='home'>
            <HiMiniHome />
          </div>
          <div className='text1'>
            <HiSparkles className='spark' />
            <h6>ADVANCED SEARCH</h6>
          </div>
          <div className='text2'>
            <h6>CONNECT-IQ</h6>
          </div>
          <div className='text3'>
            <h6>QUOTA BUSTER</h6>
          </div>
          <div className='text4'>
            <h6>NETWORK CENTER(145)</h6>
          </div>
          </div>
          <div className='menu'>
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>  

      <div className='Profile'>
        <div className="navbar-profile">
          <img src={profilePic} alt="Profile" />
           <div className='down-arrow'>
             <FaAngleDown />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
