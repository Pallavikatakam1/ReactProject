import React from 'react';
import './Sidebar.css';
import { FaBell } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        EMAIL PREFERENCES
        <span style={{ fontSize: "16px", color: "#00b3ac",marginRight: "16px"}}>✉</span>
      </div>
      <div className="sidebar-divider" />
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <span className="item-text">· Deepa's Contacts</span>
          <FaBell className="bell-icon" />
        </li>
        <li className="sidebar-item">
          <span className="item-text">· Equilar 500</span>
          <FaBell className="bell-icon" />
        </li>
        <li className="sidebar-item">
          <span className="item-text">· Gold Portco CEOs</span>
          <FaBell className="bell-icon" />
        </li>
        <li className="sidebar-item">
          <span className="item-text">· Heads of HR in EDN</span>
          <FaBell className="bell-icon" />
        </li>
        <li className="sidebar-item">
          <span className="item-text">· HR Executives</span>
          <FaBell className="bell-icon" />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
