import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem('signupData'));
    if (
      storedData &&
      storedData.email === loginData.email &&
      storedData.password === loginData.password
    ) {
      alert('Login successful!');
      navigate("/Welcome");
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <AppBar position="fixed" className="app-bar">
      <Toolbar className="toolbar">

        <Typography variant="h2" fontWeight="bold">
          facebook
        </Typography>

        
        <Box component="form" className="login-form" onSubmit={handleLogin}>
          <Box className="inputs-row">
            <TextField
              label="Email"
              name="email"
              variant="filled"
              size="small"
              InputProps={{ disableUnderline: true }}
              className="input-field"
              value={loginData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="filled"
              size="small"
              InputProps={{ disableUnderline: true }}
              className="input-field"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </Box>

          <Box className="options-row">
            <FormControlLabel
              control={<Checkbox size="small" className="checkbox" />}
              label={<Typography className="checkbox-label">Remember Me</Typography>}
            />
            <Link
              underline="hover"
              className="forgot-link"
              onClick={() => navigate('/ForgotPassword')}
              style={{ cursor: 'pointer' ,color:'white' }}
            >
              Forgot password?
            </Link>
            <Button
              variant="contained"
              size="small"
              className="login-button"
              type="submit"
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
