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
import facebook1 from '../assets/facebook1.jpeg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.trim()) {
      setEmailError(true);
      setEmailHelper('Please enter your email address');
    } else {
      setEmailError(false);
      setEmailHelper('');
    }
  };

  const handleVerify = () => {
    if (!email.trim()) {
      setEmailError(true);
      setEmailHelper('Please enter your email address');
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('signupData'));

    if (
      storedData &&
      storedData.email.toLowerCase() === email.toLowerCase()
    ) {
      navigate('/ResetPassword', { state: { email } });
    } else {
      setErrorMsg('No account found with that email.');
    }
  };

  return (
    <div
      className="forgot-wrapper"
      style={{
        backgroundImage: `url(${facebook1})`,
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
          <Typography variant="h5" className="forgot-title" gutterBottom>
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
            onChange={handleEmailChange}
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
