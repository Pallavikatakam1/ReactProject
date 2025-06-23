import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutAlert, setLogoutAlert] = useState(false);
  const addUser = useStoreActions((actions) => actions.addUser);
  const users = useStoreState((state) => state.users) || [];
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = { email, password };
    const updatedUsers = [...users, newUser];

    addUser(newUser);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('authUser', JSON.stringify(newUser));

    alert('Signup successful!');
    navigate('/Login');
  };

  const confirmLogout = () => {
    setOpenDialog(false);
    setLogoutAlert(true);
    setTimeout(() => {
      setLogoutAlert(false);
      navigate('/');
    }, 1000);
  };

  return (
  <Container maxWidth="sm" sx={{ mt: 10 }}>
    <Box
      sx={{
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#e6ee9c',
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {logoutAlert && (
        <Alert severity="error" sx={{ mb: 2 }}>
          You have been logged out.
        </Alert>
      )}
        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{  mt: 2, ml: 5, width: '80%' }}>
            Register
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2, ml: 5, width: '80%' }}
            onClick={() => setOpenDialog(true)}
          >
            Logout
          </Button>
        </form>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to log out?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">No</Button>
            <Button onClick={confirmLogout} color="error" autoFocus>Yes</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Signup;