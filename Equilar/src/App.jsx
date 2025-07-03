import { useState } from 'react'
import './App.css'
import Navbar from "./navbar.jsx"
import Navbar2 from "./navbar2.jsx"
import Main from "./mainContent.jsx"
import Feedback from './Feedback.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='page-wrapper'>
      <div className='content-container'>
      <Navbar/>
      <Navbar2/>
      <Main/>
      <Feedback/>
    </div>
    </div>
  );
};

export default App
