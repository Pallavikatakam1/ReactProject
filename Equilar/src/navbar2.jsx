import React, { useState } from 'react';
import './navbar2.css';
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";

const Navbar2 = () => {
  const [activeTab, setActiveTab] = useState('Company Updates');

  const tabs = [
    { label: 'Company Updates', count: 15 },
    { label: 'New PE/VC Financings', count: 3 },
  ];

  return (
    <div className="tab-nav">
      
      <div className="tab-list">
        <div className="left-arrow"><FaChevronLeft /></div>
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`tab-item ${activeTab === tab.label ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label} ({tab.count})
            
          </div>
          
        ))}
          <div className='right-arrow'><FaChevronRight/></div>
      </div>
     
    </div>
  );
};

export default Navbar2;
