import React, { useEffect, useState } from 'react';
import './MainContent.css';
import { FaDownload } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { BsBell, BsBellFill } from 'react-icons/bs';

const MainContent = () => {
  const [updatesData, setUpdatesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setUpdatesData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data", err);
        setLoading(false);
      });
  }, []);

  const renderPersonCard = (person, org, type) => (
    <div className="update-card" key={person.notificationId}>
      <div className="card-header">
        <div className="header-left">
          <img src={org.logo} alt={org.name} className="company-logo" />
          <div className="company-info">
            <h3 className="company-name">{org.name}</h3>
            <p className="tags">· {org.listNames.join(', ')}</p>
          </div>
        </div>
        <div className="sec-date">{person.updatedDate}</div>
      </div>

      <hr className="dashed" />

      <div className="card-body">
        <p className="title">{type.replace(/([A-Z])/g, ' $1').trim()}</p>
        <div className="profile-info">
          <img src={person.largePhotoCircle} alt={person.fullName} className="profile-pic" />
          <div>
            <strong>
              {person.fullName}
              {person.isFirstDegreeConnection && <span className="badge">1st</span>}
            </strong>
            <p className="new-role">{person.title}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="main-wrapper">Loading...</div>;
  if (!updatesData) return <div className="main-wrapper">No data available</div>;

  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div className="header-row">
          <h2 className="update-heading">Your Updates</h2>

          <div className="date-download-row">
            <p className="date">April 15, 2025</p>
            <div className='divider'/>
            <button className="download-btn">
              <FaDownload />
              DOWNLOAD
            </button>
          </div>
        </div>

        <div className="content-row">
          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {updatesData.companyUpdatesList.map((company) =>
              Object.entries(company).flatMap(([key, value]) => {
                if (!Array.isArray(value) || value.length === 0 || key === 'org') return [];
                return value.map((person) => renderPersonCard(person, company.org, key));
              })
            )}
          </div>

          <div className="sidebar">
            <div className="sidebar-header">
              <span>EMAIL PREFERENCES</span>
              <FiMail />
            </div>
            <ul className="sidebar-list">
              {[
                "Deepa's Contacts",
                "Equilar 500",
                "Gold Portco CEOs",
                "Heads of HR in EDN",
                "HR Executives",
              ].map((item, i) => (
                <li key={i}>
                  · {item}
                  <BsBellFill />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
