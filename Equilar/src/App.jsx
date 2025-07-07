import { useState } from 'react';
import './App.css';
import Navbar from "./navbar.jsx";
import Navbar2 from "./Navbar2.jsx";
import Main from "./mainContent.jsx";
import Sidebar from "./Sidebar.jsx";
import Feedback from './Feedback.jsx';

function App() {
  return (
    <div className='page-wrapper'>
      <Navbar />
      <Navbar2 />
      <div className="layout-wrapper">
        <Main />
        <Sidebar />
      </div>
      <Feedback />
    </div>
  );
}

export default App;
