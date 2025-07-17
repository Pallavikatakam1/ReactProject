import React, { useEffect, useState } from 'react';
import './myTerritory.css';
import first from '../../assets/first.png';
import second from '../../assets/second.png';
import secPlus from '../../assets/secPlus.png';

const MyTerritory = () => {
  const [territoryData, setTerritoryData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then((data) => {
        const filtered = data.companyUpdatesList
          .map((company) => {
            const { org, ...eventTypes } = company;
            const relevantEvents = {};

            Object.entries(eventTypes).forEach(([eventType, people]) => {
              const flagged = people.filter((p) => p.isTerritoryFlag);
              if (flagged.length > 0) {
                relevantEvents[eventType] = flagged;
              } 
            });

            return Object.keys(relevantEvents).length
              ? { org, ...relevantEvents }
              : null;
          })
          .filter(Boolean);

        setTerritoryData(filtered);
      })
      .catch((err) => console.error("Failed to fetch territory data", err));
  }, []);

  const renderEmployee = (person) => (
    <div className="employee-row" key={person.notificationId}>
      <img src={person.largePhotoCircle} alt={person.fullName} className="profile-pic" />
      <div className="profile-details">
        <div className="name-date-row">
          <div className="emp-name">
            <strong>{person.fullName}</strong>
            {person.isFirstDegreeConnection && <img src={first} alt="1st" className="badge" />}
            {person.isSecondDegreeConnection && <img src={second} alt="2nd" className="badge" />}
            {person.isThirdDegreeConnection && <img src={secPlus} alt="3rd+" className="badge" />}
          </div>
          <div className="update-date">{person.updatedDate}</div>
        </div>
        <div className="role-wealth-row">
          <p className="role">{person.title}</p>
          <p className="wealth-value">{person.wealthEventValue || ''}</p>
        </div>
      </div>
    </div>
  );

  const renderCompany = (company, index) => {
    const { org, ...events } = company;
    return (
      <div className="company-block" key={index}>
        <div className="company-header-section">
          <div className="company-header">
            <img src={org.logo} alt={org.name} className="company-logo" />
            <div className="company-info">
              <h3 className="company-name">{org.name}</h3>
              <p className="tags">· {org.listNames.join(' · ')}</p>
            </div>
          </div>
        </div>
        <div className="employee-updates-section">
          {Object.entries(events).map(([eventType, people]) => (
            <div key={eventType} className="event-block">
              <p className="event-type-title">{eventType}</p>
              {people.map(renderEmployee)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
  <div className="main-wrapper">
    <div className="main-container">
      <div className="header-row">
        <h2 className="update-heading">My Territory</h2>
      </div>
      <div className="content-row">
        <div className="all-updates-container">
          {territoryData.map((company, index) => (
            <div key={index}>
              {renderCompany(company, index)}
              {index < territoryData.length - 1 && <hr className="company-divider" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};


export default MyTerritory;
