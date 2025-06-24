import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import image1 from '../assets/image1.jpg'; 

const Home = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem('authUser');
    setOpenDialog(false);
    alert('You have been logged out.');
    navigate('/');
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
    <Container maxWidth="sm" className="home-container">
      <Box className="home-box">
        <Typography variant="h2" className="home-title" gutterBottom>
          QUESTK2 TECHNOLOGIES
        </Typography>

        <Button
          variant="contained"
          color="error"
          className="home-logout-button"
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
      </Box>
    </Container>
    </div>
  );
};

export default Home;