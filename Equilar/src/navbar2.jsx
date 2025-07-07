import React, { useState } from 'react';
import './navbar2.css';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Navbar2 = () => {
  var nameMap = {
    "My Territory": "MY_TERRITORY",
    "Company Updates": "COMPANY_UPDATES",
    "New PE/VC Financings": "NEW_FINANCINGS",
    "Saved Searches": "SAVE_SEARCHES"
  };

  var tabs = [
    { label: "My Territory", count: 12 },
    { label: "Company Updates", count: 15 },
    { label: "New PE/VC Financings", count: 3 },
    { label: "Saved Searches", count: 7 }
  ];

  // Page index: 0 (first 2 tabs), 1 (next 2 tabs)
  const [pageIndex, setPageIndex] = useState(0);
  const pages = [
    tabs.slice(0, 2),
    tabs.slice(2, 4)
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleLeft = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleRight = () => {
    if (pageIndex < pages.length - 1) setPageIndex(pageIndex + 1);
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
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label} ({tab.count})
          </div>
        ))}

        <div
          className={`right-arrow ${
            pageIndex === pages.length - 1 ? 'inactive' : 'active'
          }`}
          onClick={handleRight}
        >
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
