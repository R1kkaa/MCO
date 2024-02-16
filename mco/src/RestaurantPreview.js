import React from 'react';
import reportWebVitals from './reportWebVitals';
import { Box, Typography} from '@mui/material';
import {Theme} from'./themes';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './RestaurantPreview.css';
  import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { yellow } from '@mui/material/colors';
import {restaurants} from './util'
import {location} from './util'
import {ratings} from './util'
import {reviews} from './util'
import Link from '@mui/material/Link';
import CardActionArea from '@mui/material/CardActionArea';
import { restaurantreviews as featurereviews } from './util';
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

export const Body = () => {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('userid');  
  const restaurantid = null;
  function viewrestaurant(restaurant){
    let link = "/home/main/user?userid="
      link = link.concat(String(id))
    navigate(link, {state:{id:id}})
    return null;
  }
  return(
    <ThemeProvider theme={Theme}>
    <div class="maincontainer">
    <Stack spacing={1} display="flex" flexDirection="column">
    {restaurants.map((item, index) => (
        <CardActionArea href={"/home/main/restaurant?userid=".concat(String(id)).concat("&restaurantid=".concat(String(index)))}>
      <Item hoverShadow={10}><Typography variant="h5" fontFamily="Roboto" fontWeight="300">
        {item}
      </Typography>
      <Typography variant="body2" fontFamily="Roboto" fontWeight="300">{location[index]}
      </Typography>
      <Divider sx={{ borderBottomWidth: 3, marginBottom: 1, marginTop: 1,}}/>
      {ReadStarRating([ratings[index]])}<Typography variant="caption" fontFamily="Roboto" fontWeight="300">({reviews[index]} Reviews)</Typography>
      {ReviewBox(featurereviews[index][0].review)}
      </Item>
      </CardActionArea>

    ))}
    
    </Stack>
</div>
</ThemeProvider>
  );
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
