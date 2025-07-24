import React, { useEffect, useState } from 'react';
import './MainContent.css';
import first from '../../assets/first.png';
import second from '../../assets/second.png';
import secPlus from '../../assets/secPlus.png';
import download from '../../assets/download.png';
import Excel from '../../assets/Excel.png';

const MainContent = () => {
  const [updatesData, setUpdatesData] = useState({});
  const [visibleCompanyCount, setVisibleCompanyCount] = useState(50);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [logoError, setLogoError] = useState({}); 

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setUpdatesData(data))
      .catch(err => console.error("Failed to fetch data", err));
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0]).toUpperCase();
  };

  const getColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 60%, 60%)`;
  };

  const handleLogoError = (companyName) => {
    setLogoError(prev => ({ ...prev, [companyName]: true }));
  };

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

    const logoElement = !logoError[org.name] && org.logo ? (
      <img
        src={org.logo}
        alt={org.name}
        className="company-logo"
        onError={() => handleLogoError(org.name)}
      />
    ) : (
      <div className="company-logo-placeholder" style={{ backgroundColor: getColorFromName(org.name) }}>
        {getInitials(org.name)}
      </div>
    );

    return (
      <div className="company-block" key={index}>
        <div className="company-header-section">
          <div className="company-header">
            {logoElement}
            <div className="company-info">
              <h3 className="companyName">{org.name}</h3>
              <p className="tags">· {org.listNames.join(' · ')}</p>
            </div>
          </div>
        </div>

        <div className="employee-updates-section">
          {Object.entries(events).map(([eventType, people]) =>
            people.length > 0 ? (
              <div key={eventType} className="event-block">
                <p className="event-type-title" style={{ color: colorMap[eventType] || '#000' }}>
                  {eventType.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                {people.map((person) => renderEmployee(person))}
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!updatesData.companyUpdatesList) return;
    const handleScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      if (
        scrolledToBottom &&
        visibleCompanyCount < updatesData.companyUpdatesList.length
      ) {
        setShowLoadMore(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCompanyCount, updatesData.companyUpdatesList]);

  if (!updatesData || !updatesData.companyUpdatesList) {
    return <div className="main-wrapper">Loading...</div>;
  }

  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div className="header-row">
          <h2 className="update-heading">Your Updates</h2>
          <div className="date-download-row">
            <p className="date">April 15, 2025</p>
            <div className="divider" />
            <button className="download-btn">
              <img src={Excel} className="excel-img" alt="excel" />
              DOWNLOAD
              <img src={download} className="download-img" alt="download" />
            </button>
          </div>
        </div>

        <div className="content-row">
          <div className="all-updates-container">
            {updatesData.companyUpdatesList.slice(0, visibleCompanyCount).map((company, index) => (
              <div key={index}>
                {renderCompany(company, index)}
                {index < visibleCompanyCount - 1 && <hr className="company-divider" />}
              </div>
            ))}
          </div>
        </div>

        {visibleCompanyCount < updatesData.companyUpdatesList.length && showLoadMore && (
          <div className="load-more-container">
            <button
              className="load-more-btn"
              onClick={() => {
                const nextCount = visibleCompanyCount + 50;
                if (nextCount < updatesData.companyUpdatesList.length) {
                  setVisibleCompanyCount(nextCount);
                  setShowLoadMore(false);
                } else {
                  setVisibleCompanyCount(updatesData.companyUpdatesList.length);
                  setShowLoadMore(false);
                }
              }}
            >
              Load More Companies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
