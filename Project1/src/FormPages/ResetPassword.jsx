import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { useStoreActions } from 'easy-peasy';
import { useLocation, useNavigate } from 'react-router-dom';
import './resetPassword.css';
import image1 from '../assets/image1.jpg'; // Make sure the path is correct


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const setUsers = useStoreActions(actions => actions.setUsers);

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
    setUsers(updatedUsers);

    alert('Password reset successful!');
    navigate('/login');
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
    <Container maxWidth="sm" className="reset-container">
      <Box className="reset-box">
        <Typography variant="h6" className="reset-title" gutterBottom>
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