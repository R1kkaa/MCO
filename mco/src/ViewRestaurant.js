import React from 'react';
import reportWebVitals from './reportWebVitals';
import './RestaurantPreview.css';
import { Box, Typography, Button, Rating, CardMedia, Avatar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './themes';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import mapImage from './images/jollibeemap.jpg';
import { useSearchParams } from 'react-router-dom';
import { restaurants as names } from './util';
import {location} from './util';
import {ratings} from './util';
import {reviews} from './util';
import { ReadStarRating } from './RestaurantPreview';
import Divider from '@mui/material/Divider';

export const Body = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('userid');   
    const restaurantid = searchParams.get('restaurantid');   

     const restaurants = [
    {
      name: names[restaurantid],
      reviews: [
        { user: "John", rating: 4, review: "Great food and service!" },
        { user: "Jane", rating: 5, review: "Best chickenjoy ever!" },
        { user: "Joshua", rating: 0, review: "Naholdap ako!" },
        { user: "Jules", rating: 1, review: "Masungit yung mga cashier!" },
        { user: "Jan", rating: 3, review: "Najumpscare ako ni Freddy Fazbear sa loob" },

      ]
    },
  ];

  const NameCard = styled(Card)(({ theme }) => ({
    backgroundColor: Theme.palette.primary.main,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: '#000000',
    marginBottom: theme.spacing(2),
  }));

  const ContentCard = styled(Card)(({ theme }) => ({
    backgroundColor: Theme.palette.primary.main,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: '#000000',
    fontFamily: 'Italiana-Regular',
    marginBottom: theme.spacing(2),
    height: '30vh', 
    overflow: 'hidden', 
  }));

   const ReviewsCard = styled(Card)(({ theme }) => ({
    backgroundColor: Theme.palette.primary.light,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: '#000000',
    fontFamily: 'Italiana-Regular',
    marginBottom: theme.spacing(2),
    maxHeight: '45vh', 
    overflowY: 'auto', 
  }));

  const ReviewCard = styled(Card)(({ theme }) => ({
    backgroundColor: Theme.palette.primary.main,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: '#000000',
    fontFamily: 'Italiana-Regular',
    position: 'relative', 
    marginBottom: theme.spacing(2),
  }));

  const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
    height: '100%', 
    width: '45%', 
    objectFit: 'cover'
  }));

  const UserIcon = styled(Avatar)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  }));

  return (
    <ThemeProvider theme={Theme}>
      <div className="maincontainer">
        {restaurants.map((restaurant, index) => (
          <div key={index}>
            <NameCard>
              <Typography fontFamily="Roboto"variant="h4">{restaurant.name}</Typography>
              <Typography variant="subtitle2" fontFamily="Roboto" fontWeight="300">{location[restaurantid]}
      </Typography>
      <Divider sx={{ borderBottomWidth: 3, marginBottom: 1, marginTop: 1,}}/>
      {ReadStarRating([ratings[restaurantid]])}<Typography variant="caption" fontFamily="Roboto" fontWeight="300">({reviews[restaurantid]} Reviews)</Typography>
            </NameCard>
            
            <ContentCard>
              <CustomCardMedia
                component="img"
                src={mapImage}                
                alt={`${restaurant.name} Map`}
              />
            </ContentCard>
            <ReviewsCard>
              {restaurant.reviews.map((review, reviewIndex) => (
                <ReviewCard key={reviewIndex}>
                  <UserIcon>
                    {review.user.charAt(0).toUpperCase()}
                  </UserIcon>
                  <Box ml={5}> 
                    <Typography variant="h6">{review.user}</Typography>
                    {ReadStarRating(review.rating)}
                    <Typography>{review.review}</Typography>
                  </Box>
                </ReviewCard>
              ))}
            </ReviewsCard>
          </div>
        ))}
      </div>
    </ThemeProvider>
  );
};

reportWebVitals();