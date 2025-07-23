import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/navbar1/navbar';
import Navbar2 from './components/navbar2/navbar2';
import Sidebar from './components/sidebar/Sidebar';

import MainContent from './Pages/CompanyUpdates/mainContent';
import Feedback from './Pages/CompanyUpdates/Feedback';
import MyTerritory from './Pages/myTerritory/myTerritory';
import NewFinancing from './Pages/newFinancing/newFinance'; 
import SavedSearches from './Pages/savedSearches/savedSearch'; 

const CompanyUpdatesPage = () => (
  <div className="main-wrapper">
    <div className="main-container">
      {/* <div className="header-layout"> */}
        <MainContent />
      </div>
        <Sidebar />
      <Feedback />
    </div>
  // </div>
);

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Navbar />
        <Navbar2 />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/my-updates" />} />
          <Route path="/my-updates" element={<CompanyUpdatesPage />} />
          <Route path="/my-territory" element={<MyTerritory />} />
          <Route path="/new-financings" element={<NewFinancing />} /> 
          <Route path="/saved-searches" element={<SavedSearches />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
