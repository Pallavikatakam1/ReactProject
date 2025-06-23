import React, { useState } from 'react';
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
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

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
  };

  const confirmLogout = () => {
    setOpenDialog(false);
    localStorage.removeItem('authUser');
    setLogoutAlert(true);
    setTimeout(() => {
      setLogoutAlert(false);
      navigate('/');
    }, 1000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
        backgroundColor: '#e6ee9c',
        borderRadius: '15px',
        boxShadow: '3px',
        padding: 24
      }}>
        <LockOutlinedIcon style={{ fontSize: 60, color: '#3f51b5' }} />
        <Typography component="h1" variant="h5" style={{ marginTop: '20px' }}>
          Log In
        </Typography>

        {logoutAlert && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            You have been logged out.
          </Alert>
        )}

        {errorMsg && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {errorMsg}
          </Alert>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%', marginTop: '20px' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            sx={{ mt: 2, ml: 5, width: '80%' }}
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
            sx={{ mt: 2, ml: 5, width: '80%' }}
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
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
            sx={{ mt: 2, ml: 5, width: '80%' }}
            variant="contained"
            color="success"
          >
            Login
          </Button>

          <Divider style={{ margin: '20px' }} />
          <Link href="/Signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </form>

        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          onClick={() => setOpenDialog(true)}
        >
          Logout
        </Button>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to log out?
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
  );
};

export default Login;