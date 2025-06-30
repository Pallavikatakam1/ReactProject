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
  Alert,
  Box
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import './login.css';
import project2 from '../assets/project2.jpg';
 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    const rememberedPassword = localStorage.getItem('rememberPassword');
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);
 
  const handleEmailChange = (e) => {
    const value = e.target.value;

    setEmail(value);
 
    if (!value.trim()) {

      setEmailError(true);

      setEmailHelper('Please enter your email');

    } else {

      setEmailError(false);

      setEmailHelper('');

    }

  };
 
  const handlePasswordChange = (e) => {

    const value = e.target.value;

    setPassword(value);
 
    if (!value.trim()) {

      setPasswordError(true);

      setPasswordHelper('Please enter your password');

    } else {

      setPasswordError(false);

      setPasswordHelper('');

    }

  };
 
  const handleLogin = (e) => {

    e.preventDefault();

    setErrorMsg('');

    let isValid = true;
 
    if (!email.trim()) {

      setEmailError(true);

      setEmailHelper('Please enter your email');

      isValid = false;

    }
 
    if (!password.trim()) {

      setPasswordError(true);

      setPasswordHelper('Please enter your password');

      isValid = false;

    }
 
    if (!isValid) return;
 
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
    navigate('/Home');
 
    if (rememberMe) {

      localStorage.setItem('rememberEmail', email);

      localStorage.setItem('rememberPassword', password);

    } else {

      localStorage.removeItem('rememberEmail');

      localStorage.removeItem('rememberPassword');

    }

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
<Box sx={{ mt: 2 }}>
<TextField

                fullWidth

                variant="outlined"

                label="Email Address"

                autoComplete="email"

                value={email}

                onChange={handleEmailChange}

                error={emailError}

                helperText={emailHelper}

              />
</Box>
 
            <Box sx={{ mt: 2 }}>
<TextField

                fullWidth

                variant="outlined"

                label="Password"

                type="password"

                autoComplete="current-password"

                value={password}

                onChange={handlePasswordChange}

                error={passwordError}

                helperText={passwordHelper}

              />
</Box>
 
            <FormControlLabel

              sx={{ mt: 1 }}

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

              sx={{ mt: 2, ml:17}}
>

              Login
</Button>
 
            <Divider sx={{ mt: 2 }} />
<Link href="/Signup" variant="body2" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>

              {"Don't have an account? Sign Up"}
</Link>
</form>
 
          <Button

            variant="contained"

            sx={{ mt: 2 }}

            onClick={() => navigate('/')}
>

            Back
</Button>
</div>
</Container>
</div>

  );

};
 
export default Login;

 