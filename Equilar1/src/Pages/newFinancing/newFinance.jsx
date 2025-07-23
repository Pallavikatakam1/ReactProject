import React, { useEffect, useState } from 'react';
import styles from './newFinance.module.css';
import first from '../../assets/first.png';
import second from '../../assets/second.png';
import secPlus from '../../assets/secPlus.png';
import Excel from '../../assets/Excel.png';
import download from '../../assets/download.png';

const NewFinancings = () => {
  const [financingData, setFinancingData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.companyUpdatesList
          .map((company) => {
            const { org, ...eventTypes } = company;
            const relevantEvents = {};

            Object.entries(eventTypes).forEach(([eventType, people]) => {
              const flagged = people.filter(p => p.isNewFinancingFlag);
              if (flagged.length > 0) {
                relevantEvents[eventType] = flagged;
              }
            });

            return Object.keys(relevantEvents).length
              ? { org, ...relevantEvents }
              : null;
          })
          .filter(Boolean);

        setFinancingData(filtered);
      })
      .catch(err => console.error("Failed to fetch New Financing data", err));
  }, []);

  const renderEmployee = (person) => (
    <div className={styles["employee-row"]} key={person.notificationId}>
      <img src={person.largePhotoCircle} alt={person.fullName} className={styles["profile-pic"]} />
      <div className={styles["profile-details"]}>
        <div className={styles["name-date-row"]}>
          <div className={styles["emp-name"]}>
            <strong>{person.fullName}</strong>
            {person.isFirstDegreeConnection && <img src={first} alt="1st" className={styles["badge"]} />}
            {person.isSecondDegreeConnection && <img src={second} alt="2nd" className={styles["badge"]} />}
            {person.isThirdDegreeConnection && <img src={secPlus} alt="3rd+" className={styles["badge"]} />}
          </div>
          <div className={styles["update-date"]}>{person.updatedDate}</div>
        </div>
        <div className={styles["role-wealth-row"]}>
          <p className={styles["role"]}>{person.title}</p>
          <p className={styles["wealth-value"]}>{person.wealthEventValue || ''}</p>
        </div>
      </div>
    </div>
  );

  const renderCompany = (company, index) => {
    const { org, ...events } = company;
    return (
      <div className={styles["company-block"]} key={index}>
        <div className={styles["company-header-section"]}>
          <div className={styles["company-header"]}>
            <img src={org.logo} alt={org.name} className={styles["company-logo"]} />
            <div className={styles["company-info"]}>
              <h3 className={styles["company-name"]}>{org.name}</h3>
              <p className={styles["tags"]}>· {org.listNames.join(' · ')}</p>
            </div>
          </div>
        </div>
        <div className={styles["employee-updates-section"]}>
          {Object.entries(events).map(([eventType, people]) => (
            <div key={eventType} className={styles["event-block"]}>
              <p className={styles["event-type-title"]}>{eventType}</p>
              {people.map(renderEmployee)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles["main-wrapper"]}>
      <div className={styles["main-container"]}>
        <div className={styles["header-row"]}>
          <h2 className={styles["update-heading"]}>New PE/VC Financings</h2>
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
            {financingData.length === 0 ? (
              <p className={styles["center-message"]}>No new financing records found.</p>
            ) : (
              financingData.map((company, index) => (
                <div key={index}>
                  {renderCompany(company, index)}
                  {index < financingData.length - 1 && <hr className={styles["company-divider"]} />}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFinancings;


