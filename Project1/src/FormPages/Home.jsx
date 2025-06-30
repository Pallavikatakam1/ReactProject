import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import project4 from '../assets/project4.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${project4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm" className="home-container">
        <Box className="home-box">
          <Typography variant="h1" className="home-title" gutterBottom>
            QUESTK2 TECHNOLOGIES
          </Typography>

          <Button
            variant="contained"
            color="error"
            className="home-logout-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
