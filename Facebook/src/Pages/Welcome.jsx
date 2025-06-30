import React from 'react';
import {
  Container,
  Box,
  Button,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import facebook1 from '../assets/facebook1.jpeg';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    navigate('/');
  };

  return (
    <div
      className="welcome-wrapper"
      style={{
        backgroundImage: `url(${facebook1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm" className="welcome-container">
        <Box className="welcome-box">
          <Typography
            variant="h2"
            className="welcome-title"
            color="blue"
            gutterBottom
          >
            Welcome to Facebook
          </Typography>

          <Button
            variant="contained"
            color="error"
            className="welcome-logout-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Welcome;