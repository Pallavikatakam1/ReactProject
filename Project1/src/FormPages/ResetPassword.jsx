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
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: '#e6ee9c',
          boxShadow: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" gutterBottom>
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
          fullWidth
          sx={{  mt: 4, ml: 3, width: '70%' }}
          onClick={handleReset}
        >
          Reset Password
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;