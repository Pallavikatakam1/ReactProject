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
import image1 from '../assets/image1.jpg'; // Make sure the path is correct


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = savedUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      navigate('/ResetPassword', { state: { email } });
    } else {
      alert('No account found with that email.');
    }
  };

  return (
    <div
              style={{
                backgroundImage: `url(${image1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
    <Container maxWidth="sm" className="forgot-container">
      <Box className="forgot-box">
        <Typography variant="h6" className="forgot-title" gutterBottom>
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