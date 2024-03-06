import React from 'react';
import reportWebVitals from './reportWebVitals';
import './RestaurantPreview.css';
import { Box, Typography, Button, Rating, CardMedia, Avatar, TextField } from '@mui/material';
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
import {ButtonGroup} from '@mui/material';
import { ReviewBox } from './RestaurantPreview';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { StyledRating } from './RestaurantPreview';
import Input from '@mui/material/Input';
import { HeaderButton } from './header';
import { name } from './util';
import { restaurantreviews } from './util';
import {restaurants as restaurantnames} from './util';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import {map as maps} from './util'
export const Body = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('userid');   
    const restaurantid = searchParams.get('restaurantid');  
    const [value, setValue] = React.useState(0);    
    const [expandedId, setExpandedId] = React.useState(-1);
    const handleExpandClick = i => {
      setExpandedId(expandedId === i ? -1 : i);
    };

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
    maxHeight: '55vh', 
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
function EstablishmentResponse(Details, Title = "Establishment Owner's Response", Edited = false){
    return(
      <ThemeProvider theme={Theme}>
      <Box         
      sx={{
      width: 500,
      height: 100,
      borderRadius: 1,
      bgcolor: 'primary.light',
      alignItems: 'center',
      padding: '10px',
      marginLeft: '40px',
      marginBottom: '10px',
      }}>
        <Typography variant="subtitle2">{Title}{
          Edited && " ( Edited )"
        }
        </Typography>
        <Divider sx={{ borderBottomWidth: 3, bgcolor: "primary.main"}}/>
        <Typography fontFamily="Roboto" variant="caption">{Details}</Typography>
        </Box>
      </ThemeProvider>
      )
  }
  return (
    <ThemeProvider theme={Theme}>
      <div className="maincontainer">
            <NameCard>
              <Typography fontFamily="Roboto"variant="h4">{restaurantnames[restaurantid]}</Typography>
              <Typography variant="subtitle2" fontFamily="Roboto" fontWeight="300">{location[restaurantid]}
      </Typography>
      <Divider sx={{ borderBottomWidth: 3, marginBottom: 1, marginTop: 1,}}/>
      {ReadStarRating([ratings[restaurantid]])}<Typography variant="caption" fontFamily="Roboto" fontWeight="300">({reviews[restaurantid]} Reviews)</Typography>
            </NameCard>
            
            <ContentCard>
              <CustomCardMedia
                component="img"
                src={maps[restaurantid]}                
              />
            </ContentCard>
          {
            id >= 0 &&
            <div class="user-review">
            <div class = "user-comment">
              <Input id="user-comment" size="small" variant="filled" placeholder = "Write a review..." sx={{width: '95%',margin:'10px'}}/>
            </div>
            <div class = "review-buttons">
              <StyledRating precision={0.5} name="simple-controlled" value={value} onChange={(event, newValue) => {setValue(newValue);}}/>
              <HeaderButton>Upload File</HeaderButton>
              <HeaderButton>Comment</HeaderButton>
            </div>
          </div> 
          }
            <ReviewsCard>
              {restaurantreviews[restaurantid].map((review, reviewIndex) => (
                <ReviewCard key={reviewIndex}>
                  <UserIcon>
                    {name[review.userid].charAt(0).toUpperCase()}
                  </UserIcon>
                  <Box ml={5}> 
                    <Typography fontFamily="Roboto" variant="h6">{name[review.userid]}</Typography>
                    {ReadStarRating(review.rating)}
                    {ReviewBox(review.review, "Review")}
                    {EstablishmentResponse("Thank You!")}
                  </Box>
                  <ButtonGroup variant="outlined" aria-label="Basic button group">
                    {
                        id < 0 && id !=review.userid                   
                        && <Button color="secondary" variant="outlined" aria-label="Helpful" startIcon={<AddCommentIcon/>}><Typography variant="body" fontFamily="Roboto" onClick={() => handleExpandClick(reviewIndex)}>Reply As Owner</Typography></Button>
                    }{
                        id >= 0 && id !=review.userid && (
                            <Button color="secondary" variant="outlined" aria-label="Helpful" endIcon={<ThumbUpIcon/>}><Typography variant="body" fontFamily="Roboto">{review.helpful} Helpful</Typography></Button>
                              )
                    }
                  {
                      id >= 0 && id !=review.userid && (
                            <Button color="secondary" variant="outlined" aria-label="Reply" startIcon={<ThumbDownIcon/>}><Typography variant="body" fontFamily="Roboto">{review.unhelpful} Unhelpful</Typography></Button> 
                            )
                    }{ id == review.userid && (
                      <Button color="secondary" variant="outlined" aria-label="Edit" startIcon={<EditIcon/>}><Typography variant="body" fontFamily="Roboto" onClick={() => handleExpandClick(reviewIndex)}>Edit</Typography></Button>
                    )
                    }{ id == review.userid && (
                      <Button color="secondary" variant="outlined" aria-label="Delete" endIcon={<DeleteIcon/>}><Typography variant="body" fontFamily="Roboto">Delete</Typography></Button>
                    )
                    }{
                      id == "null" && (
                          <Button color="secondary" href="/home/register" variant="outlined" aria-label="Helpful" endIcon={<ThumbUpIcon/>}><Typography variant="body" fontFamily="Roboto">{review.helpful} Helpful</Typography></Button>
                            )
                  }
                {
                    id == "null" && (
                          <Button color="secondary" href="/home/register" variant="outlined" aria-label="Reply" startIcon={<ThumbDownIcon/>}><Typography variant="body" fontFamily="Roboto">{review.unhelpful} Unhelpful</Typography></Button> 
                          )
                  }


                    </ButtonGroup>
                    <Collapse in={expandedId === reviewIndex && review.userid == id} timeout="auto" unmountOnExit>
                    {<Divider sx={{ marginTop:"10px", borderBottomWidth: 1, bgcolor: "#000000"}}/>}
                    {<Input multiline rows={1} maxRows={5} id="user-comment" size="small" variant="filled" defaultValue  = {review.review} sx={{width: '95%',margin:'10px'}}/>}
                      </Collapse>
                      <Collapse in={expandedId === reviewIndex && id < 0} timeout="auto" unmountOnExit>
                    {<Divider sx={{ marginTop:"10px", borderBottomWidth: 1, bgcolor: "#000000"}}/>}
                    {<Input multiline rows={1} maxRows={5} id="user-comment" size="small" variant="filled" label="Reply As Owner" sx={{width: '95%',margin:'10px'}}/>}
                      </Collapse>
                </ReviewCard>
              ))}
            </ReviewsCard>
          </div>
    </ThemeProvider>
  );
};

reportWebVitals();