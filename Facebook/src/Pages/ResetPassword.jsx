import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './resetPassword.css';
import facebook1 from '../assets/facebook1.jpeg';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (!value.trim()) {
      setPasswordError(true);
      setPasswordHelper('Please enter a new password');
    } else {
      setPasswordError(false);
      setPasswordHelper('');
    }
  };

  const handleReset = () => {
    if (!newPassword.trim()) {
      setPasswordError(true);
      setPasswordHelper('Please enter a new password');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const updatedUsers = storedUsers.map(user =>
      user.email.toLowerCase() === email.toLowerCase()
        ? { ...user, password: newPassword }
        : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setSuccessMsg('Password reset successful!');
    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  return (
    <div
      className="reset-wrapper"
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
      <Container maxWidth="sm" className="reset-container">
        <Box className="reset-box">
          <Typography variant="h5" className="reset-title" gutterBottom>
            Reset Your Password
          </Typography>

          {successMsg && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMsg}
            </Alert>
          )}

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <TextField
            fullWidth
            label="New Password"
            type="password"
            margin="normal"
            value={newPassword}
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={passwordHelper}
          />
          <Button
            variant="contained"
            className="reset-button"
            onClick={handleReset}
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default ResetPassword;
