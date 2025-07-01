import { useState } from 'react'
import './App.css'
import Navbar from "./navbar.jsx"
import Navbar2 from "./navbar2.jsx"
import Main from "./mainContent.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Navbar2/>
      <Main/>
    </>
  );
};

export default App
