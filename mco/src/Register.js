//add default pictures?

import React from 'react';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import Carousel from './carousel'
import { Box, Typography} from '@mui/material';
import {Theme} from'./themes';
import { ThemeProvider } from '@mui/material/styles';
import {ThemeTextField} from './Login';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

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

export function InputFileUpload() {
  return (
    <RegisterButton component="label" variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 1px 1px #000000'}}>
    Upload Avatar 
    <VisuallyHiddenInput type="file" />
    </RegisterButton>
  );
}

export function Body(){
  return(
  <span class="maindiv">
  <span class="carousel">
  <Carousel />
  </span>
  <div class="registerbox">
  <BoxSx></BoxSx>
  </div>
  </span>
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
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const descriptionRef = useRef();
  const [image, setImage] = useState(null);
  
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  function checkfields() {
    if(image == null || emailRef.current.value=="" || passwordRef.current.value=="" || repasswordRef.current.value=="" || usernameRef.current.value=="" || firstNameRef.current.value=="" || lastNameRef.current.value==""){
      alert("Please Fill in all the required Fields")
      return false
    }
    if(firstNameRef.current.value.length > 50 || lastNameRef.current.value.length > 50)
    {
      alert("Name is too long.")
      return false

    }    
    if(usernameRef.current.value.length > 50)
    {
      alert("Username is too long.")
      return false

    }    
    return true;
  }
  const formvalidation = () => {
    var inc = false
    var usernamefound = false
    axios.post('http://localhost:5000/home/register/check')
    .then(response => {
      response.data.forEach(element => {
        if(String(element.username) == usernameRef.current.value || String(element.email) == emailRef.current.value){
          usernamefound = true
          inc = true;
        }
      });
      if(usernamefound)
        alert("Username/Email already taken.")
        if(passwordRef.current.value != repasswordRef.current.value)
        {
          alert("Password does not match.")
          inc = true;
        }
        if(checkfields() && !inc){
          const data = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            description: descriptionRef.current.value,
            username: usernameRef.current.value
          }
          axios.post('http://localhost:5000/home/register', data).then(response => {
            const newimage = new FormData(); 
            const filename = String(response.data).concat("_review_media.")
            const type = selectedImage.type.split("image/")[1]
            newimage.append('my-image-file', selectedImage, filename+type)
            newimage.append('id', response.data)
            axios.post('http://localhost:5000/home/register/upload', newimage).then(response2 => {
              navigate("/home/login")
            })
          })
        }
      }, error => {
      console.log(error);
    });
  };

  const getFileInfo = (e) => {
    //NOTE THE ADDITION OF 'e' PARAMETER
       console.log('File info working!')
       console.log(e.target.files[0]);
       setSelectedImage(e.target.files[0]);
       const formData = new FormData(); 
       //FILE INFO NAME WILL BE "my-image-file"
       formData.append('my-image-file', e.target.files[0]);
       setImage(formData);
     }

  return (
    <ThemeProvider theme={Theme}>
    <Box
        sx={{
          width: 500,
          height: 635,
          borderRadius: 1,
          bgcolor: 'primary.light',
          boxShadow: '3px 5px 9px #000000',
          alignItems: 'center',
        }}
      >
        <div class="register">
          <Typography variant='h3' color="primary.dark" fontFamily="Roboto" fontWeight="100">Register Account</Typography>
        <span class="registerinput1">      
          <ThemeTextField id="fname" inputRef={firstNameRef} size="small" label="First Name" variant="filled" color="secondary" sx={{opacity: 1}}/>
          <ThemeTextField id="lname" inputRef={lastNameRef} size="small" label="Last Name" variant="filled" color="secondary" sx={{opacity: 1}}/>
        </span>
        <span class="registerinput1">      
          <ThemeTextField id="email" inputRef={emailRef} size="small" label="Email" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput1">      
        <ThemeTextField id="username" inputRef={usernameRef} size="small" label="Username" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput1">      
          <ThemeTextField id="password"  inputRef={passwordRef} size="small" type="password" label="Password" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput1">      
          <ThemeTextField id="retypepassword" inputRef={repasswordRef} size="small" type="password" label="Retype Password" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="registerinput1">      
        <ThemeTextField  multiline row={4} maxRows={4} inputRef={descriptionRef} id="description" size="small" label="Description" variant="filled" color="secondary" sx={{opacity: 1, width: '55ch'}}/>
        </span>
        <span class="centercol">

        <RegisterButton component="label" variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 1px 1px #000000'}}>
        Upload Avatar 
        <VisuallyHiddenInput type="file" onChange={getFileInfo} accept="image/*"/>
        </RegisterButton>

        <RegisterButton onClick={formvalidation} variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 1px 1px #000000'}}>
            Register </RegisterButton>     
            </span>
            <span >
        {imageUrl && selectedImage && (
              <Box
              sx={{
                width: 500,
                height: 200,
                borderRadius: 1,
                bgcolor: 'primary.light',
                boxShadow: '3px 5px 9px #000000',
                alignItems: 'center',
              }}
            >
        <Box  textAlign="center">
          <Typography variant='h6' color="primary.dark" fontFamily="Roboto" fontWeight="100"><div>Image Preview:</div></Typography>
          <img src={imageUrl} alt={selectedImage.name} width="187px" height="125px" />
          <Typography variant='body2' color="primary.dark" fontFamily="Roboto" fontWeight="100"><div>Scaled to Profile/Avatar</div></Typography>
        </Box>
        </Box>
      )}               </span>
        </div>
      </Box>
      </ThemeProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
