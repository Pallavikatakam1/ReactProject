import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import project3 from '../assets/project3.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    setEmailError(false);
    setEmailHelper('');
    setErrorMsg('');

    if (!email.trim()) {
      setEmailError(true);
      setEmailHelper('Please enter your email address');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = savedUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      navigate('/ResetPassword', { state: { email } });
    } else {
      setErrorMsg('No account found with that email.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${project3})`,
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

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Enter your registered email"
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={emailError}
            helperText={emailHelper}
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
