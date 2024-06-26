import React from 'react';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import Carousel from './carousel'
import { Box, Typography} from '@mui/material';
import {Theme} from'./themes';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import  axios  from 'axios';
import { useEffect } from 'react';
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
  backgroundColor: Theme.palette.primary.main,
  '&:hover': {
    backgroundColor: '#bf7e1d',
    color: 'black',
  },
  width: 150, 
  fontFamily: 'Roboto',
  fontWeight: '400',
  
}));
export const ThemeTextField = styled(TextField)({
  "& label": {
    color: "Theme.palette.primary.dark"
  },
});

function BoxSx() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [remember, setRemember] = useState(true)
  const [valid, setValid] = useState(1);

  useEffect(() => {
    const check = async () => {
      axios.post("http://localhost:5000/logged").then(response => {
        if(response.data.success){
          navigate("/home/main")
        }
      })
    }
    check()
  });

  const loguser = () => {
    


    let data = {
      username: emailRef.current.value,
      password: passwordRef.current.value,
      remember: remember

    }
    axios.post('http://localhost:5000/home/login', data)
    .then(response => {
      if(response.data.success){
        console.log(response.data)
        navigate('/home/main', { state: { userid: response.data._id, isOwner: response.data.isOwner, currlocation: "home" } })
      }
    }).catch(function (error) {
      setValid(0);
    });
  };
  const typevalid = () => {
    setValid(1)
  }
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
        <div class="register2">
          <Typography variant='h3' color="primary.dark" fontFamily="Roboto" fontWeight="100">Login Account</Typography>
        <span class="registerinput1">      
          <ThemeTextField error={valid===0 } onChange={typevalid} onClick={typevalid} inputRef={emailRef} id="email" size="small" label="Email/Username" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch',  input: { color: 'primary.dark' } }}/>
        </span>
        <span class="registerinput2">      
          <ThemeTextField error={valid===0} onChange={typevalid} onClick={typevalid} inputRef={passwordRef} type="password" id="password" size="small" label="Password" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        <FormControlLabel control={<Checkbox defaultChecked color="secondary"/>} onChange={()=>setRemember(remember ? false : true)} label="Remember me?" />
        </span>
        <RegisterButton variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 1px 1px #000000'}} onClick={loguser}>
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
