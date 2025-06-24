import React from 'react';
import { Container, Box, Typography, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import image1 from '../assets/image1.jpg'; 

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
       style={{
        backgroundImage: `url(${image1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
     }}
    >
    <Container maxWidth="sm" className="welcome-container" >
      <Box className="welcome-box"
        
      >
        <Typography variant="h2" className="welcome-title" gutterBottom>
          WELCOME
        </Typography>

        <div className="welcome-button-group">
         <Button
           className="welcome-button"
           onClick={() => navigate('/Login')}
         >
           Login
         </Button>
         <Button type="submit" 
         
           className="welcome-button" 
           onClick={() => navigate('/Signup')}
         >
           SignUp
         </Button>
           </div>
      </Box>
    </Container>
    </div>
  );
};

export default Welcome;