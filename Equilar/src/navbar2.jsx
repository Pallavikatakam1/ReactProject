import React, { useState } from 'react';
import './navbar2.css';

const Navbar2 = () => {
  const [activeTab, setActiveTab] = useState('Company Updates');

  const tabs = [
    { label: 'Company Updates', count: 15 },
    { label: 'New PE/VC Financings', count: 3 },
  ];

  return (
    <div className="tab-nav">
      <div className="arrow">&lt;</div>
      <div className="tab-list">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`tab-item ${activeTab === tab.label ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label} ({tab.count})
          </div>
        ))}
      </div>
      <div className="arrow">&gt;</div>
    </div>
  );
};

export default Navbar2;
