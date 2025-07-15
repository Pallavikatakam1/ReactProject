import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar1/Navbar';
import Navbar2 from './components/navbar2/navbar2';
import MainContent from './Pages/CompanyUpdates/MainContent';
import Sidebar from './Pages/CompanyUpdates/Sidebar';
import Feedback from './Pages/CompanyUpdates/Feedback';
import MyTerritory from './Pages/myTerritory/myTerritory';
import NewFinancings from './Pages/newFinancing/newFinance';
import SavedSearches from './Pages/savedSearches/savedSearch';

const CompanyUpdatesPage = () => (
  <div className="main-wrapper">
    <div className="main-container">
      <div className="header-layout">
        <MainContent />
        <Sidebar />
      </div>
      <Feedback />
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <div className="content-container">
          <Navbar />
          <Navbar2 />
          
          <Routes>
            <Route path="/" element={<Navigate to="/my-updates" />} />
            <Route path="/my-updates" element={<CompanyUpdatesPage />} />
            <Route path="/my-territory" element={<MyTerritory />} />
            <Route path="/new-financings" element={<NewFinancings />} />
            <Route path="/saved-searches" element={<SavedSearches />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
