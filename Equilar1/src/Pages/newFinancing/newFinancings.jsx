import React, { useEffect, useState } from 'react';
import styles from './newFinance.module.css';
import Excel from '../../assets/Excel.png';
import download from '../../assets/download.png';

const NewFinancings = () => {
  const [financings, setFinancings] = useState([]);
  const [logoError, setLogoError] = useState({});

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        const raw = data?.newFinancingsUpdates?.newFinancialsList || [];
        const unique = Array.from(new Map(raw.map(item => [item.notificationId, item])).values());
        setFinancings(unique);
      })
      .catch((err) => console.error('Failed to fetch data', err));
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    return words.length === 1
      ? words[0].substring(0, 2).toUpperCase()
      : words[0][0].toUpperCase();
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
    setLogoError((prev) => ({ ...prev, [companyName]: true }));
  };

  const renderCard = (item, index) => {
    const org = item.org || {};
    const investors = item.investors?.investorsList || [];
    const hasValidLogo = org.logo && !logoError[org.name];

    const logoElement = hasValidLogo ? (
      <img
        src={org.logo}
        alt={org.name}
        className={styles["company-logo"]}
        onError={() => handleLogoError(org.name)}
      />
    ) : (
      <div
        className={styles["company-logo-placeholder"]}
        style={{ backgroundColor: getColorFromName(org.name) }}
      >
        {getInitials(org.name)}
      </div>
    );

    return (
      <div className={styles["company-block"]} key={item.notificationId}>
        <div className={styles["company-header-section"]}>
          <div className={styles["company-header"]}>
            {logoElement}
            <div className={styles["company-info"]}>
              <h3 className={styles["companyName"]}>{org.name}</h3>
              <p className={styles["tags"]}>· {(org.listNames || []).join(' · ')}</p>
            </div>
          </div>
        </div>

        <div className={styles["company-divider"]} />

        <div className={styles["funding-row"]}>
          <div className={styles["funding-left"]}>
            <span className={styles["funding-amount"]}>{item.fundingAmount || org.fundingAmount || ''}</span>
            {org.fundingType && (
              <span className={styles["funding-type"]}>/{org.fundingType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
            )}
          </div>
          <div className={styles["funding-right"]}>
            <span className={styles["announced-date"]}>{org.announcedDate || '--'}</span>
          </div>
        </div>

        <div className={styles["companyDivider"]} />
        <div className={styles["investors-row"]}>
          <p className={styles["investors-label"]}>
            {investors.length > 1 ? 'INVESTORS:' : 'INVESTOR:'}
          </p>
          <div className={styles["investors-list"]}>
            {investors.length > 0 ? (
              investors.map((inv, idx) => (
                <span key={inv.id} className={styles["investor-name"]}>
                  {idx > 0 && ', '}
                  {inv.orgName}
                </span>
              ))
            ) : (
              <span className={styles["investor-name"]} style={{ color: '#aaa' }}>None</span>
            )}
          </div>
        </div>

        {index < financings.length - 1 && <hr className={styles["company-div"]} />}
      </div>
    );
  };

  return (
    <div className={styles["main-wrapper"]}>
      <div className={styles["main-container"]}>
        <div className={styles["header-row"]}>
          <h2 className={styles["update-heading"]}>Your Updates</h2>
          <div className={styles["date-download-row"]}>
            <p className={styles["date"]}>April 15, 2025</p>
            <div className={styles["divider"]} />
            <button className={styles["download-btn"]}>
              <img src={Excel} className={styles["excel-img"]} alt="excel" />
              DOWNLOAD
              <img src={download} className="download-img" alt="download" />
            </button>
          </div>
        </div>

        <div className={styles["content-row"]}>
          <div className={styles["all-updates-container"]}>
            {financings.map((item, index) => renderCard(item, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFinancings;
