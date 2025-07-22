import React, { useEffect, useState } from 'react';
import './savedSearch.css';
import first from '../../assets/first.png';
import second from '../../assets/second.png';
import secPlus from '../../assets/secPlus.png';
import download from '../../assets/download.png';
import Excel from '../../assets/Excel.png';

const SavedSearch = () => {
  const [groupedProfiles, setGroupedProfiles] = useState({});
  const [orgUpdates, setOrgUpdates] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const personList = data?.savedSearchUpdates?.personProfileList || [];
        const orgList = data?.orgSavedSearchUpdates?.orgList || [];

        const companyMap = {};
        personList.forEach((entry) => {
          const company = entry.org;
          const profiles = entry.profileList || [];
          const companyName = company?.name || 'Unknown';

          if (!companyMap[companyName]) {
            companyMap[companyName] = {
              logo: company?.logo || '',
              tags: company?.listNames || [],
              people: []
            };
          }

          profiles.forEach((person, index) => {
            companyMap[companyName].people.push({ ...person, _index: index });
          });
        });

        setGroupedProfiles(companyMap);
        setOrgUpdates(orgList);
      })
      .catch(err => console.error('Failed to fetch data', err));
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    return name.trim().charAt(0).toUpperCase();
  };

  const getColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 60%, 60%)`;
  };

  const renderEmployee = (person) => {
    const name = person.fullName || 'Unknown';
    const date = person.updatedDate || '—';
    const photo = person.largePhotoCircle;

    return (
      <div className="employee-row" key={person.notificationId || person.profileLink || person._index}>
        {photo ? (
          <img src={photo} alt={name} className="profile-pic" />
        ) : (
          <div className="profile-placeholder" style={{ backgroundColor: getColorFromName(name) }}>
            {getInitials(name)}
          </div>
        )}

        <div className="profile-details">
          <div className="name-date-row">
            <div className="emp-name">
              <strong>{name}</strong>
              {person.isFirstDegreeConnection && <img src={first} alt="1st" className="badge" />}
              {person.isSecondDegreeConnection && <img src={second} alt="2nd" className="badge" />}
              {person.isThirdDegreeConnection && <img src={secPlus} alt="3rd+" className="badge" />}
            </div>
            <div className="update-date">{date}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderCompanyGroup = (companyName, companyData) => {
    const logo = companyData.logo ? (
      <img src={companyData.logo} alt={companyName} className="company-logo" />
    ) : (
      <div className="company-logo-placeholder" style={{ backgroundColor: getColorFromName(companyName) }}>
        {getInitials(companyName)}
      </div>
    );

    return (
      <div className="company-block" key={companyName}>
        <div className="company-header-section">
          <div className="company-header">
            {logo}
            <div className="company-info">
              <h3 className="company-name">{companyName}</h3>
              <p className="tags">· {companyData.tags.join(' · ')}</p>
            </div>
          </div>
        </div>

        <hr className="dashed-divider" />

        <div className="employee-updates-section">
          {companyData.people.map((person) => renderEmployee(person))}
        </div>

        <hr className="company-divider" />
      </div>
    );
  };

const renderOrgUpdate = (org) => {
  const logo = org.orgLogo ? (
    <img src={org.orgLogo} alt={org.orgName} className="company-logo" />
  ) : (
    <div className="company-logo-placeholder" style={{ backgroundColor: getColorFromName(org.orgName) }}>
      {getInitials(org.orgName)}
    </div>
  );

  const locationParts = [org.city, org.state, org.country].filter(Boolean);
  const location = locationParts.join(', ');

  return (
    <div className="company-block" key={org.notificationId}>
      <div className="company-header-section">
        <div className="company-header">
          {logo}
          <div className="company-info">
            <h3 className="company-name">{org.orgName}</h3>
            {org.listNames?.length > 0 && (
              <p className="tags">· {org.listNames.join(' · ')}</p>
            )}
          </div>
        </div>
        <div className="update-date">{org.updatedDate}</div>
      </div>

      <hr className="dashed-divider" />

      <div className="org-extra-info">
        {location && <p className="org-location"><strong>Location:</strong> {location}</p>}
        {org.employeeCount && <p className="org-empcount"><strong>Employees:</strong> {org.employeeCount}</p>}
      </div>

      <hr className="company-divider" />
    </div>
  );
};


  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div className="header-row">
          <h2 className="update-heading">Saved Searches</h2>
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
            {Object.entries(groupedProfiles).map(([companyName, companyData]) =>
              renderCompanyGroup(companyName, companyData)
            )}
            {orgUpdates.map((org) => renderOrgUpdate(org))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedSearch;
