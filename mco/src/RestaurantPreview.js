import React from 'react';
import reportWebVitals from './reportWebVitals';
import { Box, Typography} from '@mui/material';
import {Theme} from'./themes';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import './RestaurantPreview.css';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {restaurants} from './util'
import {ratings} from './util'
import {reviews} from './util'
import CardActionArea from '@mui/material/CardActionArea';
import { restaurantreviews as featurereviews } from './util';
import { useLocation } from 'react-router-dom';
import  axios  from 'axios';

const options = {
  shouldForwardProp: (prop) => prop !== 'hoverShadow',
};

export const StyledRating = styled(Rating)({
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

const Item = styled(Card, options)(({ theme=Theme, hoverShadow = 1 }) => ({
  key: 0,
  backgroundColor: Theme.palette.primary.light,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: '#000000',
  paddingLeft: '35px',
  borderRadius: '0',
  ':hover': {
    boxShadow: theme.shadows[hoverShadow]},
}));

export function ReviewBox(Details, Title = "Featured Review", Edited = false){
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
    marginBottom: '10px',

    }}>
      <Typography variant="subtitle2">{Title}{
        Edited && " ( Edited )"
      }
      </Typography>
      <Divider sx={{ borderBottomWidth: 3}}/>
      <Typography fontFamily="Roboto" variant="caption">{Details}</Typography>
      </Box>
    </ThemeProvider>
    )
}

//function to hold cover the props for navigation and location, data storage
export function Body() {
  let navigate = useNavigate();
  const location = useLocation();
  var id = "nouser"
  var isOwner = false
  if(location.state){
    id = location.state.userid
    isOwner = location.state.isOwner
  }

  return <Preview        
        router={{ location, navigate, id, isOwner}}
      />
}

//class to render the components
export class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantslist: [],
      reviewslist: []
    };
    }
    componentDidMount() {
      axios.get("http://localhost:5000/restaurants").then(response => 
      {
        this.setState({
          restaurantslist: response.data,
        });
          }, error => {
        console.log(error);
      });
      axios.get("http://localhost:5000/restaurants/featured").then(response => 
      {
        this.setState({
          reviewslist: response.data,
        });
          }, error => {
        console.log(error);
      });
    }
  render(){
    const {restaurantslist, reviewslist} = this.state;

    { return (
    <ThemeProvider theme={Theme}>
    <div class="maincontainer">
    <Stack spacing={1} display="flex" flexDirection="column">
    {restaurantslist.map((item, index) => (
        <CardActionArea onClick={()=>this.props.router.navigate("/home/main/restaurant/".concat(item._id),{ state: { userid: this.props.router.id, isOwner: this.props.router.isOwner, restaurantid : item._id, currlocation: "restaurants"} })}>
      <Item hoverShadow={10}><Typography variant="h5" fontFamily="Roboto" fontWeight="300">
        {item.restaurantName}
      </Typography>
      <Typography variant="body2" fontFamily="Roboto" fontWeight="300">{item.location}
      </Typography>
      <Divider sx={{ borderBottomWidth: 3, marginBottom: 1, marginTop: 1,}}/>
      {ReadStarRating(item.avgrating)}<Typography variant="caption" fontFamily="Roboto" fontWeight="300">({item.numreviews} Reviews)</Typography>
      {ReviewBox(JSON.stringify(reviewslist[index]))}
      </Item>
      </CardActionArea>

    ))}
    
    </Stack>
</div>
</ThemeProvider>);}
    };
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
