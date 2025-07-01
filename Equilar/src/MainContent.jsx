import React from 'react';
import './MainContent.css';
import profilePic from './assets/profile.jpg'; 
import companyLogo from './assets/companyLogo.png'; 
import { FaDownload } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { BsBell } from 'react-icons/bs';

const MainContent = () => {
  return (
    <div className="main-wrapper">
      <div className="content-section">
        <div className="header">
          <div>
            <h2>Your Updates</h2>
            <p className="update-date">April 15, 2025</p>
          </div>
          <button className="download-btn">
            <FaDownload /> DOWNLOAD
          </button>
        </div>

        <div className="update-card">
          <div className="card-header">
            <img src={companyLogo} alt="Company" className="company-logo" />
            <div>
              <h3 className="company-name">Athena Alliance (Private)</h3>
              <p className="tags">Heads of HR in EDN · HR Executives</p>
            </div>
            <span className="update-date-right">Apr 8, 2025 (SEC)</span>
          </div>

          <div className="update-details">
            <p className="section-title">Appointment</p>
            <div className="person-info">
              <img src={profilePic} alt="Shaara Roman" className="person-pic" />
              <div>
                <strong>Shaara Roman <span className="badge">1st</span></strong>
                <p className="new-member">New: Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <span>EMAIL PREFERENCES</span>
          <FiMail />
        </div>
        <ul className="preferences-list">
          {[
            "Deepa's Contacts",
            'Equilar 500',
            'Gold Portco CEOs',
            'Heads of HR in EDN',
            'HR Executives'
          ].map((item, idx) => (
            <li key={idx}>
              · {item}
              <BsBell className="bell-icon" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainContent;
