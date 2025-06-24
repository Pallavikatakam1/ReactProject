import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Alert,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import image1 from '../assets/image1.jpg'; 

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
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

    const newUser = { firstName, lastName, phone, email, password };
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
    }, 500);
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
      <Container maxWidth="sm" className="signup-container">
        <div className="signup-box">
          <Typography variant="h4" className="signup-title">
            Signup
          </Typography>

          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
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

            <div className="signup-button-group">
              <Button type="submit" variant="contained">
                Register
              </Button>
              <Button variant="contained" color="black" onClick={() => setOpenDialog(true)}>
                Back
              </Button>
            </div>
          </form>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogContent>
              <DialogContentText>
                Are you sure want to go back?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                No
              </Button>
              <Button onClick={confirmLogout} color="error" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    </div>
  );
};

export default Signup;