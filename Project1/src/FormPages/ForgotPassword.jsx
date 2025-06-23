import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!email.trim()) {
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
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        sx={{
          padding: 4,
          borderRadius: 4,
          backgroundColor: '#e6ee9c',
          boxShadow: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" gutterBottom>
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
          fullWidth
          sx={{  mt: 4, ml: 2, width: '70%' }}
          onClick={handleVerify}
        >
          Verify Email
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;