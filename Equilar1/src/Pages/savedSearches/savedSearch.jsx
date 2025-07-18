import React, { useEffect, useState } from 'react';
import './savedSearch.css';
import download from '../../assets/download.png';
import Excel from '../../assets/Excel.png';

const SavedSearches = () => {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched savedSearchUpdates:", data.savedSearchUpdates);
        const list = data.savedSearchUpdates?.personProfileList;
        if (Array.isArray(list)) {
          setSearches(list);
        } else {
          console.error("personPro fileList is not an array", list);
        }
      })
      .catch(err => console.error("Failed to fetch saved searches", err));
  }, []);

  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div className="header-row">
          <h2 className="update-heading">Your Saved Searches</h2>
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
            {searches.length > 0 ? (
              searches.map((person, index) => (
                <div className="search-block" key={index}>
                  <div className="search-header">
                    <img
                      src={person.largePhotoCircle}
                      className="profile-pic"
                      alt={person.fullName}
                    />
                    <div className="profile-details">
                      <div className="name-date-row">
                        <div className="emp-name">
                          <strong>{person.fullName}</strong>
                        </div>
                        <div className="update-date">{person.updatedDate}</div>
                      </div>
                      <div className="role-wealth-row">
                        <p className="role">{person.title}</p>
                        <p className="wealth-value">{person.source}</p>
                      </div>
                    </div>
                  </div>
                  {index < searches.length - 1 && (
                    <hr className="company-divider" />
                  )}
                </div>
              ))
            ) : (
              <p style={{ padding: '20px', fontSize: '14px', color: '#999' }}>
                No saved search updates available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedSearches;
