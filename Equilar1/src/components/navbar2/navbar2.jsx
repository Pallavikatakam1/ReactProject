import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import './navbar2.css';

const pathMap = {
  "Company Updates": "/my-updates",
  "My Territory": "/my-territory",
  "New PE/VC Financings": "/new-financings",
  "Saved Searches": "/saved-searches"
};

const tabs = [
  { label: "Company Updates",         count: 108 },
  { label: "My Territory",            count: 1 },
  { label: "New PE/VC Financings",    count: 3  },
  { label: "Saved Searches",          count: 43  }
];

const Navbar2 = () => {
  const pages = [tabs.slice(0, 2), 
                 tabs.slice(2, 4)
  ];
 const [pageIndex, setPageIndex] = useState(0);

  const handleLeft  = () => pageIndex > 0              && setPageIndex(p => p - 1);
  const handleRight = () => pageIndex < pages.length-1 && setPageIndex(p => p + 1);
  return (
    <div className="tab-nav">
      <div className="tab-list">
        <div
          className={`left-arrow  ${pageIndex === 0 ? 'inactive' : 'active'}`}
          onClick={handleLeft}
        >
          <FaChevronLeft />
        </div>
        {pages[pageIndex].map(tab => (
          <NavLink
            key={tab.label}
            to={pathMap[tab.label]}
            className={({ isActive }) =>
              `tab-item ${isActive ? 'active' : ''}`
            }
          >
            {tab.label} ({tab.count})
          </NavLink>
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
