import React, { useState } from 'react';
import '../Pages/Signup.css';
import { TextField } from '@mui/material';
import facebook1 from '../Assets/facebook1.jpeg'; // Update path as needed

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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
       const label = key.replace(/([A-Z])/g, ' $1').toLowerCase();
        newErrors[key] = `Enter ${label}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem('signupData', JSON.stringify(formData));
    alert('Signup successful!');

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
    setErrors({});
  };

  return (
    <div
      className="signup-wrapper"
      style={{ backgroundImage: `url(${facebook1})` }}
    >
      <div className="signup-text-container">
        <p>
          Facebook helps you connect and share with<br />
          the people in your life.
        </p>
      </div>

      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className=".signup-form-container h3">
            <h3>Sign Up</h3>
            <p>It's free and anyone can join</p>
          </div>

          <div className="form">
            {/* First Name */}
            <div className="form-row">
              <label style={{ minWidth: labelWidth }}>First Name:</label>
            <div>
              <input
                type="text"
                name="firstName"
                className={`form-input ${errors.firstName ? 'error-border' : ''}`}
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="error-text">{errors.firstName}</div>}
            </div>
            </div>

            {/* Last Name */}
            <div className="form-row">
              <label style={{ minWidth: labelWidth }}>Last Name:</label>
              <div>
              <input
                type="text"
                name="lastName"
                className={`form-input ${errors.lastName ? 'error-border' : ''}`}
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="error-text">{errors.lastName}</div>}
            </div>
            </div>

            {/* Email */}
            <div className="form-row">
              <label style={{ minWidth: labelWidth }}>Email:</label>
             <div>
              <input
                type="email"
                name="email"
                className={`form-input ${errors.email ? 'error-border' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
            </div>

            {/* Password */}
            <div className="form-row">
              <label style={{ minWidth: labelWidth }}>Password:</label>
             <div>
              <input
                type="password"
                name="password"
                className={`form-input ${errors.password ? 'error-border' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>
            </div>

            {/* Gender */}
            <div className="form-row">
              <label style={{ minWidth: labelWidth }}>Gender:</label>
             <div>
              <select
                name="gender"
                className={`form-input ${errors.gender ? 'error-border' : ''}`}
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <div className="error-text">{errors.gender}</div>}
            </div>
            </div>

            {/* Birthday */}
            <div className="form-row birthday-group">
              <label style={{ minWidth: labelWidth }}>Birthday:</label>
              <div className="birthday-fields">
               <div>
                <select
                  name="birthMonth"
                  className={`form-input ${errors.birthMonth ? 'error-border' : ''}`}
                  value={formData.birthMonth}
                  onChange={handleChange}
                >
                  <option value="">Month</option>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                    (month, i) => (
                      <option key={i} value={month}>
                        {month}
                      </option>
                    )
                  )}
                </select>
                 {errors.birthMonth && <div className="error-text">{errors.birthMonth}</div>}
                </div>
                <div>
                <select
                  name="birthDay"
                  className={`form-input ${errors.birthDay ? 'error-border' : ''}`}
                  value={formData.birthDay}
                  onChange={handleChange}
                >
                  <option value="">Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                 {errors.birthDay && <div className="error-text">{errors.birthDay}</div>}
                </div>

                <div>
                <select
                  name="birthYear"
                  className={`form-input ${errors.birthYear ? 'error-border' : ''}`}
                  value={formData.birthYear}
                  onChange={handleChange}
                >
                  <option value="">Year</option>
                  {[...Array(100)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
              </select>
                  {errors.birthYear && <div className="error-text">{errors.birthYear}</div>}
                </div>
              </div>
            </div>


            <div className="caption">Why do I need to provide this?</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="submit-button">
              SignUp
            </button>
            <div>
              <hr style={{ border: 'none', borderTop: '2px solid #ccc', margin: '10px auto', width: '120%' }} />
              <p1 style={{ fontSize: '14px', color: '#3B5998' }}>
                Create a Page for a celebrity, band or business.
              </p1>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;