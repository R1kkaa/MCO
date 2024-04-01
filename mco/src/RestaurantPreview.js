import React from 'react';
import reportWebVitals from './reportWebVitals';
import { Box, Typography} from '@mui/material';
import {Theme} from'./themes';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './css/RestaurantPreview.css';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import CardActionArea from '@mui/material/CardActionArea';
import { useLocation } from 'react-router-dom';
import  axios  from 'axios';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


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

export function ReviewBox(Details, Title = "Featured Review", Edited = false, ReviewImage = null){
  return(
    <ThemeProvider theme={Theme}>
      <Box
          sx={{
            width: 500,
            borderRadius: 1,
            bgcolor: 'primary.main',
            alignItems: 'center',
            padding: '10px',
            marginLeft: '10px',
            marginTop: '10px',
            marginBottom: '10px',
        
            }}>
    <Box         
    sx={{
    width: 500,
    height: 150,
    borderRadius: 1,
    bgcolor: 'primary.main',
    alignItems: 'center',
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
      {ReviewImage && <img src={process.env.PUBLIC_URL+ReviewImage} width="400px" height="300px" />}
      </Box>
    </ThemeProvider>
    )
}

//function to hold cover the props for navigation and location, data storage
export function Body() {
  let navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  let filter = searchParams.get("search")
  let query = ""
  if(filter){
    query = filter
  }
  var id = "nouser"
  var isOwner = false
  if(location.state){
    id = location.state.userid
    isOwner = location.state.isOwner
  }

  return <Preview        
        router={{ location, navigate, id, isOwner, query}}
      />
}

//class to render the components
export class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantslist: [],
      reviewslist: [],
      searchParams: "",
      filter: 0
    };
    }
    Filter() {
      return (
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="0+"
                  >
                      
            <FormControlLabel onClick={()=> this.setState({filter: 4 })} value="4+" control={<Radio color="secondary"/>} label={<Typography variant="subtitle2" fontFamily="Roboto" fontWeight="300" display="inline"> {"4+ Stars"} </Typography>} labelPlacement="start"/>
            <FormControlLabel onClick={()=> this.setState({filter: 3 })} value="3+" control={<Radio color="secondary"/>} label={<Typography variant="subtitle2" fontFamily="Roboto" fontWeight="300" display="inline"> {"3+ Stars"} </Typography>} labelPlacement="start"/>
            <FormControlLabel onClick={()=> this.setState({filter: 2 })} value="2+" control={<Radio color="secondary"/>} label={<Typography variant="subtitle2" fontFamily="Roboto" fontWeight="300" display="inline"> {"2+ Stars"} </Typography>} labelPlacement="start"/>
            <FormControlLabel onClick={()=> this.setState({filter: 1 })} value="1+" control={<Radio color="secondary"/>} label={<Typography variant="subtitle2" fontFamily="Roboto" fontWeight="300" display="inline"> {"1+ Star"} </Typography>} labelPlacement="start"/>
            <FormControlLabel onClick={()=> this.setState({filter: 0 })}value="0+" control={<Radio color="secondary"/>} label={<Typography variant="subtitle2" fontFamily="Roboto" fontWeight="300" display="inline"> {"0+ Star"} </Typography>} labelPlacement="start"/>
          </RadioGroup>
        </FormControl>
      );
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
    <Box         
    sx={{
    width: "98.37%",
    height: 20,
    borderRadius: 1,
    display: 'flex',
    bgcolor: 'primary.main',
    alignItems: 'center',
    padding: '10px',
    marginLeft: 'px',
    marginTop: '10px',
    marginBottom: '10px',
    verticalAlign: 'center',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'space-evenly'


    }}>
  <Typography variant="subtitle2" fontFamily="Roboto" fontWeight="300" display="inline">Filter Restaurants By Rating
      </Typography>
      {this.Filter()}
    </Box>
    <Stack spacing={1} display="flex" flexDirection="column">
    {restaurantslist.map((item, index) => (
      (item.restaurantName.toLowerCase().includes(this.props.router.query) ||  item.location.toLowerCase().includes(this.props.router.query)) && (item.avgrating >= this.state.filter) && <CardActionArea onClick={()=>this.props.router.navigate("/home/main/restaurant/".concat(item._id),{ state: { userid: this.props.router.id, isOwner: this.props.router.isOwner, restaurantid : item._id, currlocation: "restaurants"} })}>
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
