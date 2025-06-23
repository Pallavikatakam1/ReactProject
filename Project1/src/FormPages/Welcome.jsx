import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

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
          WELCOME
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 3, ml: 2 }}
          onClick={() => navigate('/Login')}
        >
          LogIn
        </Button>

        <Button
          variant="contained"
          sx={{ mt: 3, ml: 2 }}
          onClick={() => navigate('/Signup')}
        >
          SignUp
        </Button>
      </Box>
    </Container>
  );
};

export default Welcome;