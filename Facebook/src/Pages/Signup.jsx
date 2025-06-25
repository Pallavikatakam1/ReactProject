import React, { useState } from 'react';
import './Signup.css';
import facebook3 from '../Assets/facebook3.jpeg';

const Signup = () => {
  const labelWidth = 90;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields.');
      return;
    }

    
    localStorage.setItem('signupData', JSON.stringify(formData));

    alert('Signup successful! You can now log in.');

    
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      birthMonth: '',
      birthDay: '',
      birthYear: '',
    });
  };

  return (
    <div
      className="signup-wrapper"
      style={{
        backgroundImage: `url(${facebook3})`,
      }}
    >
      
      <div className="signup-text-container">
        <h1>Facebook helps you connect and share with the people in your life.</h1>
      </div>

      
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <p>It's free and anyone can join</p>

        
          <div className="form-row">
            <label style={{ minWidth: labelWidth }}>First Name:</label>
            <input
              type="text"
              name="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label style={{ minWidth: labelWidth }}>Last Name:</label>
            <input
              type="text"
              name="lastName"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label style={{ minWidth: labelWidth }}>Your Email:</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label style={{ minWidth: labelWidth }}>New Password:</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

        
          <div className="form-row">
            <label style={{ minWidth: labelWidth }}>I am:</label>
            <select
              name="gender"
              className="form-input"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Sex</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          
          <div className="form-row birthday-group">
            <label style={{ minWidth: labelWidth }}>Birthday:</label>
            <div className="birthday-fields">
              <select
                name="birthMonth"
                className="form-input"
                value={formData.birthMonth}
                onChange={handleChange}
                required
              >
                <option value="">Month</option>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                  (month, i) => (
                    <option key={i} value={month}>{month}</option>
                  )
                )}
              </select>

              <select
                name="birthDay"
                className="form-input"
                value={formData.birthDay}
                onChange={handleChange}
                required
              >
                <option value="">Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select
                name="birthYear"
                className="form-input"
                value={formData.birthYear}
                onChange={handleChange}
                required
              >
                <option value="">Year</option>
                {[...Array(100)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>{year}</option>
                  );
                })}
              </select>
            </div>
          </div>

          <p className="caption">Why do I need to provide this?</p>

          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
