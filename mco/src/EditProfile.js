import React, { useRef } from 'react';
import './css/Profile.css';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import Carousel from './carousel'
import { Box, Stack, Typography} from '@mui/material';
import {Theme} from'./themes';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {name} from './util'
import {username} from './util'
import{ desc} from './util'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import { ReviewBox } from './RestaurantPreview';
import { useNavigate } from 'react-router-dom';
import {ThemeTextField} from './Login';
import { VisuallyHiddenInput } from './Register';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#964B00',
  },
  '& .MuiRating-iconHover': {
    color: '#Ff7e00',
  },
});

export function ReadStarRating(val){
  let rating = parseFloat(val);
  return(
    <div class="starcontainer">
    <StyledRating
  name="customized-color"
  defaultValue={rating}
  getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
  precision={0.1}
  icon={<StarIcon fontSize="inherit" />}
  emptyIcon={<StarIcon fontSize="inherit" />}
  readOnly="true"
  /><Typography variant="subtitle2" fontFamily="Roboto" fontWeight="300" display="inline" >({val})</Typography>
  </div>
  )
}
export function ProfileReviewBox(Details){
  return(
    <ThemeProvider theme={Theme}>
    <Box         
    sx={{
    width: 500,
    height: 100,
    borderRadius: 1,
    bgcolor: 'primary.main',
    alignItems: 'center',
    padding: '10px',
    marginLeft: '10px',
    marginTop: '10px',
    }}>
      <Typography variant="subtitle2">{"Title Review"}</Typography>
      {ReadStarRating(5)};
      <Divider sx={{ borderBottomWidth: 3}}/>
      <Typography variant="caption">{Details}</Typography>
      </Box>
    </ThemeProvider>
    )
}
export function Body(){

  return(
  <body>
  <span class="maindiv">
  <span class="profilebox">
  <BoxSx>
  </BoxSx>
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
  width: 200, 
  fontFamily: "Roboto" ,
  fontWeight: "400"
  
}));


function BoxSx() {
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();
  let location = useLocation();
  var id = "nouser"
  var viewuser = "nouser"
  var imageurl = "https://media.istockphoto.com/id/969233490/photo/young-african-woman-smiling-at-sunset.jpg?s=612x612&w=0&k=20&c=G0cagT6s1rXm455ZN8TCReO1C78ua1xGJPXDi6eKGLA="
  var description = ""
  let descriptionRef = useRef("");  
  if(location.state){
    id = location.state.userid
    description = location.state.description
    imageurl = location.state.imageurl
    viewuser = location.state.viewuser
  }
  
  let [currimg, setImg] = useState(imageurl)
  let [currdesc, setDesc] = useState(description)
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImg(URL.createObjectURL(selectedImage));
    }
    else{
      setImg(imageurl)
    }
  }, [selectedImage]);
  

  const getFileInfo = (e) => {
    //NOTE THE ADDITION OF 'e' PARAMETER
       setSelectedImage(e.target.files[0]);
     }


  const update = () => {
    let data = {
      description: currdesc,
      newimage: false
    }
    if(selectedImage){
      data = {description: currdesc, newimage: true}
    }
    axios.post("http://localhost:5000/user/".concat(id).concat("/editprofile"), data, {withCredentials: true}).then(response => {
      if(selectedImage){
        const newimage = new FormData(); 
        const filename = id.concat("_avatar.")
        const type = selectedImage.type.split("image/")[1]
        newimage.append('my-image-file', selectedImage, filename+type)
        newimage.append('id', response.data)
        axios.post("http://localhost:5000/user/".concat(id).concat("/editprofile/upload", {withCredentials: true}), newimage).then(response2 => {
          navigate("/home/main/user/".concat(id),{ state: { userid: id, viewuser: id, currlocation: "profile"}})
        })
      }
      else{
        navigate("/home/main/user/".concat(id),{ state: { userid: id, viewuser: id, currlocation: "profile"}})
      }
    })
  }
  return (
    <ThemeProvider theme={Theme}>
    {id != "nouser" && <Box
        sx={{
          width: 1300,
          height: 660,
          borderRadius: 1,
          bgcolor: 'primary.main',
          boxShadow: '3px 5px 9px #000000',
          alignItems: 'center',
        }}
      >
      <img
          src="https://www.shutterstock.com/image-photo/healthy-food-clean-eating-selection-260nw-722718097.jpg"
          style={{
          width: '100%',
          height: '250px', 
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
          objectFit: 'cover',
          }}
      />
      <div class="editmainboxdiv">
        <div class="picturebox">
        {!selectedImage && imageurl && <img class="profilepic" src={process.env.PUBLIC_URL+currimg} /> }
        {selectedImage && imageurl && <img class="profilepic" src={currimg} /> }
                <div class="descriptioncontainer">
                <p> {currdesc} </p>
            </div>        </div>
        
            <Box
        sx={{
          width: 600,
          height: 600,
          marginLeft: '100px',
          marginTop: '-225px',
          borderRadius: 1,
          bgcolor: 'primary.light',
          boxShadow: '3px 5px 9px #000000',
          alignItems: 'center',
        }}
      >
        <div class="editdiv">
        <Typography variant="h2" fontFamily="Roboto" color="secondary">Edit Profile</Typography>     
        <span class="registerinput2">      
          <ThemeTextField multiline row={4} maxRows={4} inputRef={descriptionRef} onChange={()=>setDesc(descriptionRef.current.value)} defaultValue={description} id="description" size="small" label="Description" variant="filled" color="secondary" sx={{opacity: 1, width: '65ch'}}/>
        </span>
        <span class="centercol">
        <RegisterButton component="label" variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 1px 1px #000000'}}>
        Upload Avatar 
        <VisuallyHiddenInput type="file" onChange={getFileInfo} accept="image/*"/>
        </RegisterButton>
        <RegisterButton onClick={update} variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 1px 1px #000000'}}>
        Save </RegisterButton></span>
        </div> 
      </Box>      </div>
        
    </Box>}
    </ThemeProvider>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();