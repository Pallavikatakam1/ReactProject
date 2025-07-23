import React, { useEffect, useState } from 'react';
import styles from './savedSearch.module.css';
import first from '../../assets/first.png';
import second from '../../assets/second.png';
import secPlus from '../../assets/secPlus.png';
import download from '../../assets/download.png';
import Excel from '../../assets/Excel.png';
import defaultImage from '../../assets/defaultImage.png';

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
      <div className={styles["employee-row"]} key={person.notificationId || person.profileLink || person._index}>
        <img
          src={photo || defaultImage}
          alt={name}
          className={styles["profile-pic"]}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />

        <div className={styles["profile-details"]}>
          <div className={styles["name-date-row"]}>
            <div className={styles["emp-name"]}>
              <strong>{name}</strong>
              {person.isFirstDegreeConnection && <img src={first} alt="1st" className={styles["badge"]} />}
              {person.isSecondDegreeConnection && <img src={second} alt="2nd" className={styles["badge"]} />}
              {person.isThirdDegreeConnection && <img src={secPlus} alt="3rd+" className={styles["badge"]} />}
            </div>
            <div className={styles["update-date"]}>{date}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderCompanyGroup = (companyName, companyData) => {
  const hasValidLogo = companyData.logo && companyData.logo.trim() !== '';

  return (
    <div className={styles["company-block"]} key={companyName}>
      <div className={styles["company-header-section"]}>
        <div className={styles["company-header"]}>
          <div className={styles["logo-wrapper"]}>
            {hasValidLogo ? (
              <img
                src={companyData.logo}
                alt={companyName}
                className={styles["company-logo"]}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  const fallback = e.target.nextSibling;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}

            <div
              className={styles["company-logo-placeholder"]}
              style={{
                backgroundColor: getColorFromName(companyName),
                display: hasValidLogo ? 'none' : 'flex'
              }}
            >
              {getInitials(companyName)}
            </div>
          </div>

          <div className={styles["company-info"]}>
            <h3 className={styles["company-name"]}>{companyName}</h3>
            <p className={styles["tags"]}>· {companyData.tags.join(' · ')}</p>
          </div>
        </div>
      </div>

      <hr className={styles["dashed-divider"]} />

      <div className={styles["employee-updates-section"]}>
        {companyData.people.map((person) => renderEmployee(person))}
      </div>

      <hr className={styles["company-divider"]} />
    </div>
  );
};


  const renderOrgUpdate = (org) => {
    return (
      <div className={styles["company-block"]} key={org.notificationId}>
        <div className={styles["company-header-section"]}>
          <div className={styles["company-header"]}>
            <div className={styles["logo-wrapper"]}>
              <img
                src={org.orgLogo}
                alt={org.orgName}
                className={styles["company-logo"]}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  const fallback = e.target.nextSibling;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div
                className={styles["company-logo-placeholder"]}
                style={{ backgroundColor: getColorFromName(org.orgName), display: 'none' }}
              >
                {getInitials(org.orgName)}
              </div>
            </div>

            <div className={styles["company-info"]}>
              <h3 className={styles["company-name"]}>{org.orgName}</h3>
              {org.listNames?.length > 0 && (
                <p className={styles["tags"]}>· {org.listNames.join(' · ')}</p>
              )}
            </div>
          </div>
          <div className={styles["update-date"]}>{org.updatedDate}</div>
        </div>

        <hr className={styles["dashed-divider"]} />

        <div className={styles["org-extra-info"]}>
          {org.city && (
            <p className={styles["org-location"]}>
              <strong>Location:</strong> {[org.city, org.state, org.country].filter(Boolean).join(', ')}
            </p>
          )}
          {org.employeeCount && (
            <p className={styles["org-empcount"]}>
              <strong>Employees:</strong> {org.employeeCount}
            </p>
          )}
        </div>

        <hr className={styles["company-divider"]} />
      </div>
    );
  };

  return (
    <div className={styles["main-wrapper"]}>
      <div className={styles["main-container"]}>
        <div className={styles["header-row"]}>
          <h2 className={styles["update-heading"]}>Saved Searches</h2>
          <div className={styles["date-download-row"]}>
            <p className={styles["date"]}>April 15, 2025</p>
            <div className={styles["divider"]} />
            <button className={styles["download-btn"]}>
              <img src={Excel} className={styles["excel-img"]} alt="excel" />
              DOWNLOAD
              <img src={download} className={styles["download-img"]} alt="download" />
            </button>
          </div>
        </div>

        <div className={styles["content-row"]}>
          <div className={styles["all-updates-container"]}>
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
