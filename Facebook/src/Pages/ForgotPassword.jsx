import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import facebook3 from '../assets/facebook3.jpeg'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('signupData')); 
    if (
      storedData &&
      storedData.email.toLowerCase() === email.toLowerCase()
    ) {
      navigate('/ResetPassword', { state: { email } });
    } else {
      alert('No account found with that email.');
    }
  };

  return (
    <div
      className="forgot-wrapper"
      style={{
        backgroundImage: `url(${facebook3})`
      }}
    >
      <Container maxWidth="sm" className="forgot-container">
        <Box className="forgot-box">
          <Typography variant="h5" className="forgot-title" gutterBottom>
            Forgot Password
          </Typography>

          <TextField
            fullWidth
            label="Enter your registered email"
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            variant="contained"
            className="forgot-button"
            onClick={handleVerify}
          >
            Verify Email
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default ForgotPassword;