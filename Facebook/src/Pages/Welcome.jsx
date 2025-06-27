import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import facebook1 from '../assets/facebook1.jpeg';

const Welcome = () => {
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
          <Typography variant="h2" className="welcome-title" color='blue' gutterBottom>
            Welcome to Facebook
          </Typography>

          <Button
            variant="contained"
            color="error"
            className="welcome-logout-button"
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

export default Welcome;
