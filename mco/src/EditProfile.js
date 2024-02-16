import React from 'react';
import './Profile.css';
import './index.css';
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
import { InputFileUpload } from './Register';
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
  const id = searchParams.get('viewuserid');  
  const loggedid = searchParams.get('userid');  
  let navigate = useNavigate();
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
            <form id="profileForm" enctype="multipart/form-data">
                <img id="profileImage" class="profilepic" src="https://media.istockphoto.com/id/969233490/photo/young-african-woman-smiling-at-sunset.jpg?s=612x612&w=0&k=20&c=G0cagT6s1rXm455ZN8TCReO1C78ua1xGJPXDi6eKGLA="/>
            </form>
        </div>
        
        <BoxSx2></BoxSx2>
      </div>
        
    </Box>
    </ThemeProvider>
  );
}
function BoxSx2() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={Theme}>
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

        <span class="registerinput1"> 
          <ThemeTextField  id="email" size="small" label="Username" variant="filled" color="secondary" sx={{opacity: 1, width: '65ch',  input: { color: 'primary.dark' } }}/>
        </span>
        <span class="registerinput2">      
          <ThemeTextField multiline row={4} maxRows={4} id="description" size="small" label="Description" variant="filled" color="secondary" sx={{opacity: 1, width: '65ch'}}/>
        </span>
        <span class="centercol">        {InputFileUpload()}
<RegisterButton variant="outlined" color="secondary" size="large" style={{boxShadow: '1px 1px 1px #000000'}}>
    Save </RegisterButton></span>

        </div>
        
      </Box>
      </ThemeProvider>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();