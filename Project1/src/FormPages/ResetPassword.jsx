import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert
} from '@mui/material';
import { useStoreActions } from 'easy-peasy';
import { useLocation, useNavigate } from 'react-router-dom';
import './resetPassword.css';
import project3 from '../assets/project3.jpg';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const setUsers = useStoreActions(actions => actions.setUsers);

  const handleReset = () => {
    setPasswordError(false);
    setPasswordHelper('');
    setSuccess(false);

    if (!newPassword.trim()) {
      setPasswordError(true);
      setPasswordHelper('Please enter a new password.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const updatedUsers = storedUsers.map(user =>
      user.email.toLowerCase() === email.toLowerCase()
        ? { ...user, password: newPassword }
        : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 1000);
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
      <Container maxWidth="sm" className="reset-container">
        <Box className="reset-box">
          <Typography variant="h6" className="reset-title" gutterBottom>
            Reset Your Password
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password reset successful!
            </Alert>
          )}

          <TextField
            fullWidth
            label="New Password"
            type="password"
            margin="normal"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            error={passwordError}
            helperText={passwordHelper}
          />
          <Button
            variant="contained"
            className="reset-button"
            onClick={handleReset}
          >
            Reset Password
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default ResetPassword;
