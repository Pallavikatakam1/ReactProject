import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Container,
  FormControlLabel,
  Typography,
  Divider,
  Checkbox,
  Link,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import './login.css';
import image1 from '../assets/image1.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Load remembered credentials on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    const rememberedPassword = localStorage.getItem('rememberPassword');
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userByEmail = storedUsers.find(
      user => user.email.toLowerCase() === email.toLowerCase()
    );

    if (!userByEmail) {
      setErrorMsg('Email does not exist.');
      return;
    }

    if (userByEmail.password !== password) {
      setErrorMsg('Incorrect password.');
      return;
    }

    localStorage.setItem('authUser', JSON.stringify(userByEmail));
    setErrorMsg('');
    alert('Login successful!');
    navigate('/Home');

    if (rememberMe) {
      localStorage.setItem('rememberEmail', email);
      localStorage.setItem('rememberPassword', password);
    } else {
      localStorage.removeItem('rememberEmail');
      localStorage.removeItem('rememberPassword');
    }
  };

  const confirmLogout = () => {
    setOpenDialog(false);
    localStorage.removeItem('authUser');
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
      <Container component="main" maxWidth="xs">
        <div className="login-container">
          <LockOutlinedIcon className="login-icon" />
          <Typography component="h1" variant="h5" className="login-title">
            Log In
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {errorMsg}
            </Alert>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <TextField
              variant="outlined"
              margin="normal"
              required
              className="login-textfield"
              label="Email Address"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              className="login-textfield"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />

            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/ForgotPassword')}
              style={{ marginTop: '10px', textTransform: 'none' }}
            >
              Forgot password?
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="success"
              className="login-button"
            >
              Login
            </Button>

            <Divider className="login-divider" />
            <Link href="/Signup" variant="body2" className="login-signup-link">
              {"Don't have an account? Sign Up"}
            </Link>
          </form>

          <Button
            variant="contained"
            color="black"
            sx={{ mt: 2 }}
            onClick={() => setOpenDialog(true)}
          >
            Back
          </Button>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to go back?
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

export default Login;