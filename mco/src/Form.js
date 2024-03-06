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
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';;

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
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('userid');  
    function viewprofile(){
    let link = "/home/main?userid="
      link = link.concat(String(id))
    navigate(link, {state:{id:id}})
    return null;
  }
  return (
    <ThemeProvider theme={Theme}>
    <Box
        sx={{
        width: 500,
        height: 600,
          borderRadius: 1,
          bgcolor: 'primary.light',
          backgroundSize:'cover',
          overflowY: 'auto',
          boxShadow: '3px 5px 9px #000000',
          alignItems: 'center',
        }}
      >
        <div class="register">
          <Typography variant='h3' color="primary.dark" fontFamily ="Roboto" fontWeight="100" >Restaurant Recommendations</Typography>
        <span class="registerinput1">      
          <ThemeTextField id="fname" size="small" label="Restaurant Name" variant="filled" placeholder = "What restaurant did you discover today?" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput1">      
            <ThemeTextField id="fname" size="small" label="Location" placeholder = "e.g Agno Food Court"  variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput1">      
            <ThemeTextField id="fname" size="small" label="Landmark" variant="filled" color="secondary" placeholder = "Near Jollibee, Beside Agno..." sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput1">      
        <ThemeTextField multiline row={4} maxRows={4} id="description" size="small" label="Description" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        
        <RegisterButton variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 2px 3px #000000'}} onClick={viewprofile}>
            Submit </RegisterButton>
        </div>
      </Box>
      </ThemeProvider>
  );

}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
