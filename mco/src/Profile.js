import React from 'react';
import './css/Profile.css';
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
import { restaurantreviews } from './util';
import {restaurants as restaurantnames} from './util';
import axios from 'axios';
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

const ReviewsCard = styled(Card)(({ theme }) => ({
  backgroundColor: Theme.palette.primary.main,
  textAlign: 'left',
  color: '#000000',
  fontFamily: 'Italiana-Regular',
  maxHeight: '100%', 
  maxWidth: '100%',
  overflowY: 'auto', 
}));

export function Body(){

  let navigate = useNavigate();
  const location = useLocation();
  var id = "nouser"
  var viewuser = "none"
  if(location.state){
    id = location.state.userid
    viewuser = location.state.viewuser
  }
  else{
    viewuser = window.location.href.split("/")[6]
  }
  return(
  <body>
  <span class="maindiv">
  <span class="profilebox">
  <BoxSx router={{ location, navigate, id, viewuser}}>
  </BoxSx>
  </span>
  </span>
  </body>
  );
};
function ReviewBoxWithStar(Details, Rating, Title = "Featured Review", Edited = false){
  return(
    <ThemeProvider theme={Theme}>
    <Box         
    sx={{
    width: 500,
    height: 150,
    borderRadius: 1,
    bgcolor: 'primary.main',
    alignItems: 'center',
    padding: '10px',
    marginLeft: '10px',
    marginTop: '10px',
    marginBottom: '10px',

    }}>
      <Typography variant="h6" display="inline">{Title}{
        Edited && " ( Edited )"
      }{ReadStarRating(Rating)}
      </Typography>
      <Divider sx={{ borderBottomWidth: 3}}/>
      <Typography fontFamily="Roboto" variant="caption">{Details}</Typography>
      </Box>
    </ThemeProvider>
    )
}

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
const HeaderButton = styled(Button)(({ theme }) => ({
  color: '#454545',
  backgroundColor: Theme.palette.primary.light, 
  '&:hover': {
    backgroundColor: '#bf7e1d',
    color: 'black',
  },
  minWidth: '150px', 
  fontFamily: "Roboto" ,
  fontWeight: "400"
  
}));
class BoxSx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      description: "",
      reviewslist: [],
      imagelocation: "",
      imgdefault: "https://media.istockphoto.com/id/969233490/photo/young-african-woman-smiling-at-sunset.jpg?s=612x612&w=0&k=20&c=G0cagT6s1rXm455ZN8TCReO1C78ua1xGJPXDi6eKGLA="
    };
    }
    componentDidMount() {
      axios.get("http://localhost:5000/user/".concat(this.props.router.viewuser)).then(response => 
      {
        this.setState({
          firstname: response.data.firstName,
          lastname: response.data.lastName,
          username: response.data.username,
          description: response.data.description,
          imagelocation: response.data.imageurl
        });
          }, error => {
        console.log(error);
      });
      axios.get("http://localhost:5000/user/".concat(this.props.router.viewuser).concat("/reviews")).then(response => 
      {
        this.setState({
          reviewslist: response.data,
        });
          }, error => {
        console.log(error);
      });
    }
  render(){
      const {firstname, lastname, username, description, reviewslist, imagelocation} = this.state;
      return(
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
                          {this.props.router.id == this.props.router.viewuser && 
<HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000', marginLeft: '1140px', marginTop: '-36%'}} onClick={()=>this.props.router.navigate("/home/main/user/editprofile",{ state: { userid: this.props.router.id, viewuser : this.props.router.viewuser, description: description, imageurl: imagelocation}})}>Edit Profile</HeaderButton>      
}
{this.props.router.id != this.props.router.viewuser && 
<HeaderButton variant="outlined" disabled style={{boxShadow: '2px 3px 5px #000000', marginLeft: '1140px', marginTop: '-36%', opacity: '0%'}}></HeaderButton>      
}
      <div class="mainboxdiv">
        <div class="picturebox2">
            {imagelocation && <img class="profilepic" src={process.env.PUBLIC_URL+imagelocation} />}
            <div class="descriptioncontainer">
                <p> {description} </p>
            </div>
        </div>
      
        <div>
            <div class="namecontainer">
            {firstname.concat(" ").concat(lastname)}<br/>
            </div>
            <div class="usernamecontainer">
            {username}<br/>
            </div>

        </div>

        <span>
          <div class="rightboxdiv">
            <div class="descriptioncontainer2">
              <Typography variant="h6">Reviews and Comments</Typography>   
              {reviewslist.map((review, reviewIndex) => (
                  <span>
                  {ReviewBoxWithStar(review.review, review.rating, review.restaurant[0].restaurantName)}
                  </span>
              ))}
  </div>
          </div>
        </span>
      </div>
        
    </Box>
    </ThemeProvider>);}
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
