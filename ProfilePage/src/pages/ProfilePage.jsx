import React, { useState, useEffect } from "react";
import "./profilePage.css";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { TbBellPlus } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import { FaCircleQuestion } from "react-icons/fa6";
import { MdThumbUpOffAlt } from "react-icons/md";
import { MdThumbDownOffAlt } from "react-icons/md";

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('/profiles.json')
      .then((res) => res.json())
      .then((data) => setProfiles(data));
  }, []);

  return (
    <div className="main-wrapper">
      {profiles.map((profile, idx) => (
        <div className="profile-container" key={idx}>
            <div className="top-div">
          <div className="profile-pic">
            <img
              src={profile["profile-url"]}
              alt={profile.fullName}
              className="profile-photo"
            />
            </div>
            <div className="details">
            <div className="emp-name">{profile.fullName}</div>
            <div className="company-name">{profile.company}</div>
            <div className="title">{profile.title}</div>
            <div className="board">Public Boards ({profile.publicBoards})</div>

             <div className="btn-row">
                <button className="download-btn">
                    <MdOutlineDownloadForOffline className="download"/>
                    Download
                </button>
                <button className="updates">
                       <TbBellPlus className="bell"/>
                    Get Updates 
                </button>
                <div className='menu-btn'>
                    <BsThreeDotsVertical />
                </div>
            </div>
            </div>
          </div>
          <div className="bottom-div">
            <div className="head">
            <div className="header">
                <div className="left">
                <HiSparkles className='sparkle' />
                <h4 className="heading">LATEST INSIGHTS </h4>
                <FaCircleQuestion  className="question"/>
                </div>
                </div>
                <div className="right">
                    <MdThumbUpOffAlt className="thumbup"/>
                    <MdThumbDownOffAlt className="thumbdown"/>
                </div>
                </div>

            <hr className="company-divider"/>
            
          </div>
        </div>      
      ))}
      
    </div>
  );
};

export default ProfilePage;
