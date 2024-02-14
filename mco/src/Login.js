import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Carousel from './carousel'
import { Box, Typography} from '@mui/material';
import {Theme} from'./themes';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export function Body(){
  return(
  <body>
  <span class="maindiv">
  <span class="carousel">
  <Carousel />
  </span>
  <span class="registerbox">
  <BoxSx></BoxSx>
  </span>
  </span>
  </body>
  );
};
const RegisterButton = styled(Button)(({ theme }) => ({
  color: '#454545',
  backgroundColor: '#F19E23',
  '&:hover': {
    backgroundColor: '#bf7e1d',
    color: 'black',
  },
  width: 150, 
  fontFamily: 'Italiana-Regular',
  
}));

function BoxSx() {
  const navigate = useNavigate();
  const loguser = () => {navigate('/home/main')};

  return (
    <ThemeProvider theme={Theme}>
    <Box
        sx={{
          width: 500,
          height: 600,
          borderRadius: 1,
          bgcolor: 'primary.main',
          boxShadow: '3px 5px 9px #000000',
          alignItems: 'center',
        }}
      >
        <div class="register2">
          <Typography variant='h3'>Login Account</Typography>
        <span class="registerinput1">      
          <TextField id="email" size="small" label="Email/Username" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput2">      
          <TextField id="password" type="password" size="small" label="Password" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <RegisterButton variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 2px 3px #000000'}} onClick={loguser}>
            Login</RegisterButton>
        </div>
        
      </Box>
      </ThemeProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
