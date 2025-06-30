import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Alert,
  Box
} from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import project2 from '../assets/project2.jpg';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Validation states
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [firstNameHelper, setFirstNameHelper] = useState('');
  const [lastNameHelper, setLastNameHelper] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');

  const addUser = useStoreActions((actions) => actions.addUser);
  const users = useStoreState((state) => state.users) || [];
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Reset validation
    setFirstNameError(false);
    setLastNameError(false);
    setPhoneError(false);
    setEmailError(false);
    setPasswordError(false);

    setFirstNameHelper('');
    setLastNameHelper('');
    setPhoneHelper('');
    setEmailHelper('');
    setPasswordHelper('');
    setError('');

    let valid = true;

    if (!firstName.trim()) {
      setFirstNameError(true);
      setFirstNameHelper('First name is required');
      valid = false;
    }
    if (!lastName.trim()) {
      setLastNameError(true);
      setLastNameHelper('Last name is required');
      valid = false;
    }
    if (!phone.trim()) {
      setPhoneError(true);
      setPhoneHelper('Phone number is required');
      valid = false;
    }
    if (!email.trim()) {
      setEmailError(true);
      setEmailHelper('Email is required');
      valid = false;
    }
    if (!password.trim()) {
      setPasswordError(true);
      setPasswordHelper('Password is required');
      valid = false;
    }

    if (!valid) return;

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

  return (
    <div
      style={{
        backgroundImage: `url(${project2})`,
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

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={firstNameError}
              helperText={firstNameHelper}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={lastNameError}
              helperText={lastNameHelper}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={phoneError}
              helperText={phoneHelper}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailHelper}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordHelper}
            />

            <Box className="signup-button-group" sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                Register
              </Button>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate('/')}
              >
                Back
              </Button>
            </Box>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
