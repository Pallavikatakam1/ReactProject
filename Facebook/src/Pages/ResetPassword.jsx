import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './resetPassword.css';
import facebook3 from '../assets/facebook3.jpeg';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleReset = () => {
    if (!newPassword.trim()) {
      alert('Please enter a new password.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const updatedUsers = storedUsers.map(user =>
      user.email.toLowerCase() === email.toLowerCase()
        ? { ...user, password: newPassword }
        : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Password reset successful!');
    navigate('/'); 
  };

  return (
     <div
       className="reset-wrapper"
       style={{
       backgroundImage: `url(${facebook3})`
       }}
     >
      <Container maxWidth="sm" className="reset-container">
        <Box className="reset-box">
          <Typography variant="h5" className="reset-title" gutterBottom>
            Reset Your Password
          </Typography>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            margin="normal"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
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
