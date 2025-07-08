import React, { useState } from 'react';
import './navbar2.css';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Navbar2 = ({ onTabChange }) => {
  var nameMap = {
    "Company Updates": "COMPANY_UPDATES",
    "My Territory": "MY_TERRITORY",
    "New PE/VC Financings": "NEW_FINANCINGS",
    "Saved Searches": "SAVE_SEARCHES"
  };

  var tabs = [
    { label: "Company Updates", count: 15 },
    { label: "My Territory", count: 12 },
    { label: "New PE/VC Financings", count: 3 },
    { label: "Saved Searches", count: 7 }
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const pages = [
    tabs.slice(0, 2),
    tabs.slice(2, 4)
  ];

  const handleLeft = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleRight = () => {
    if (pageIndex < pages.length - 1) setPageIndex(pageIndex + 1);
  };

  const handleTabClick = (label) => {
    setActiveTab(label);
    onTabChange(label); 
  };

  return (
    <div className="tab-nav">
      <div className="tab-list">
        <div
          className={`left-arrow ${pageIndex === 0 ? 'inactive' : 'active'}`}
          onClick={handleLeft}
        >
          <FaChevronLeft />
        </div>

        {pages[pageIndex].map((tab) => (
          <div
            key={tab.label}
            className={`tab-item ${activeTab === tab.label ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.label} ({tab.count})
          </div>
        ))}

        <div
          className={`right-arrow ${pageIndex === pages.length - 1 ? 'inactive' : 'active'}`}
          onClick={handleRight}
        >
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
