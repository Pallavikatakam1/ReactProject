import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Checkbox,
  Link,
  FormControlLabel
} from '@mui/material';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: false
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const newErrors = {
      email: loginData.email.trim() === '',
      password: loginData.password.trim() === ''
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    navigate('/Welcome');
  };

  return (
    <AppBar position="fixed" className="app-bar">
      <Toolbar className="toolbar">
        <Typography variant="h2" fontWeight="bold">
          facebook
        </Typography>

        <form onSubmit={handleLogin}>
          <div className="email">
            {/* Email stack */}
            <div className="input-stack">
              <FormControlLabel
                control={<Checkbox size="small" className="checkbox" />}
                label={
                  <Typography className="checkbox-label">Remember Me</Typography>
                }
              />
              <TextField
                placeholder="Email"
                name="email"
                type='email'
                variant="outlined"
                color='white'
                size="medium"
                value={loginData.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email ? 'Enter email' : ''}
                InputProps={{ disableUnderline: true }}
                className="input-field"
              />
            </div>

           
            <div className="input-stack">
              <Link
                underline="hover"
                className="forgot-link"
                onClick={() => navigate('/ForgotPassword')}
              >
                Forgot password?
              </Link>
              <TextField
                placeholder="Password"
                name="password"
                type="password"
                variant="outlined"
                color='white'
                size="medium"
                value={loginData.password}
                onChange={handleChange}
                error={errors.password}
                helperText={errors.password ? 'Enter password' : ''}
                InputProps={{ disableUnderline: true }}
                className="input-field"
              />
            </div>

            
            <Button
              variant="contained"
              size="small"
              className="login-button"
              type="submit"
            >
              Log In
            </Button>
          </div>
        </form>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
