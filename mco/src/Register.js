import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Carousel from './carousel'
import { Box, Typography} from '@mui/material';
import {Theme} from'./themes';
import { ThemeProvider } from '@mui/material/styles';
import {ThemeTextField} from './Login';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  return (
    <RegisterButton component="label" variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 1px 1px #000000'}}>
    Upload Avatar 
    <VisuallyHiddenInput type="file" />
    </RegisterButton>
  );
}

export function Body(){
  return(
  <React.Fragment>
  <span class="maindiv">
  <span class="carousel">
  <Carousel />
  </span>
  <span class="registerbox">
  <BoxSx></BoxSx>
  </span>
  </span>
  </React.Fragment>
  );
};
const RegisterButton = styled(Button)(({ theme }) => ({
  color: '#454545',
  backgroundColor: '#F19E23',
  '&:hover': {
    backgroundColor: '#bf7e1d',
    color: 'black',
  },
  width: 200, 
  fontFamily: "Roboto" ,
  fontWeight: "400"
  
}));

function BoxSx() {
  return (
    <ThemeProvider theme={Theme}>
    <Box
        sx={{
          width: 500,
          height: 600,
          borderRadius: 1,
          bgcolor: 'primary.light',
          boxShadow: '3px 5px 9px #000000',
          alignItems: 'center',
        }}
      >
        <div class="register">
          <Typography variant='h3' color="primary.dark" fontFamily="Roboto" fontWeight="100">Register Account</Typography>
        <span class="registerinput1">      
          <ThemeTextField id="fname" size="small" label="First Name" variant="filled" color="secondary" sx={{opacity: 1}}/>
          <ThemeTextField id="lname" size="small" label="Last Name" variant="filled" color="secondary" sx={{opacity: 1}}/>
        </span>
        <span class="registerinput1">      
          <ThemeTextField id="email" size="small" label="Email" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput1">      
          <ThemeTextField id="username" size="small" label="Username" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput1">      
          <ThemeTextField id="password" size="small" type="password" label="Password" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput1">      
          <ThemeTextField id="retypepassword" size="small" type="password" label="Retype Password" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput2">      
          <ThemeTextField id="description" size="small" multiline rows={4} label="Short Description (Optional)" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="centercol">
        {InputFileUpload()}
        <RegisterButton variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 1px 1px #000000'}} href="/home/login">
            Register </RegisterButton>            
            </span>
        </div>
        
      </Box>
      </ThemeProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
