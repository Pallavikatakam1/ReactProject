import React, { useEffect, useState } from 'react';
import './MainContent.css';
import first from '../../assets/first.png';
import second from '../../assets/second.png';
import secPlus from '../../assets/secPlus.png';
import download from '../../assets/download.png';
import Excel from '../../assets/Excel.png';


const MainContent = () => {
  const [updatesData, setUpdatesData] = useState({});

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setUpdatesData(data))
      .catch(err => console.error("Failed to fetch data", err));
  }, []);

  const renderEmployee = (person) => (
    <div className="employee-row" key={person.notificationId}>
      <img src={person.largePhotoCircle} alt={person.fullName} className="profile-pic" />

      <div className="profile-details">
        <div className="name-date-row">
          <div className="emp-name">
            <strong>{person.fullName}</strong>
            {person.isFirstDegreeConnection && (
              <img src={first} alt="1st" className="badge" />
            )}
            {person.isSecondDegreeConnection && (
              <img src={second} alt="2nd" className="badge" />
            )}
            {person.isThirdDegreeConnection && (
              <img src={secPlus} alt="3rd+" className="badge" />
            )}
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
    const colorMap = {
      appointment: '#1F5BCF',
      departure: '#ED3327',
      removedFromWebsite: '#ED3327',
      baseSalary: '#139D6C',
      bonusTarget: '#F4911D',
      equityAward: '#217606',
      employmentAgreement: '#5C27D4',
      upcomingVesting: '#19AFB1',
      optionsExercised: '#094337',
      stockSold: '#007EFF',
    };

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
          {Object.entries(events).map(([eventType, people]) =>
            people.length > 0 ? (
              <div key={eventType} className="event-block">
                <p className="event-type-title" style={{ color: colorMap[eventType] || '#000' }}>
                  {/* {eventType.replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())
                    .trim()} */}
                    {eventType}
                </p>
                {people.map((person) => renderEmployee(person))}
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  };

  if (!updatesData) return <div className="main-wrapper">Loading...</div>;

  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div className="header-row">
          <h2 className="update-heading">Your Updates</h2>
          <div className="date-download-row">
            <p className="date">April 15, 2025</p>
            <div className="divider" />
            <button className="download-btn">
              <img src={Excel} className="excel-img" />
              DOWNLOAD
              <img src={download} className="download-img" />
            </button>
          </div>
        </div>

        <div className="content-row">
          <div className="all-updates-container">
            {updatesData?.companyUpdatesList?.map((company, index) => (
              <div key={index}>
                {renderCompany(company, index)}
                {index < updatesData.companyUpdatesList.length - 1 && (
                  <hr className="company-divider" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
