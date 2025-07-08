import React, { useState, useEffect } from 'react';
import feedback from '../../assets/feedback.png';
import { FaArrowUp } from 'react-icons/fa';
import './Feedback.css';

const Feedback = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 200); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-wrapper">
      {showArrow && (
        <button className="scroll-up-arrow" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
      <div className="feedback-button">
        <img src={feedback} alt="feedback" className="feedback-icon" />
        <span>Share Feedback</span>
      </div>
    </div>
  );
};

export default Feedback;
