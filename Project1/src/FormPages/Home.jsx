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
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        sx={{
          padding: 4,
          borderRadius: 4,
          backgroundColor: '#e6ee9c',
          boxShadow: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant="h2" gutterBottom>
          QUESTK2 TECHNOLOGIES
        </Typography>

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
      </Box>
    </Container>
  );
};

export default Home;