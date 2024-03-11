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
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import  axios  from 'axios';


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

export function Body() {
  let navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = React.useState(0);    
  const [expandedId, setExpandedId] = React.useState(-1);
  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
  };
  return <View        
        router={{ location, navigate}}
      />
}

export class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      reviewslist: [],
      expandedId: -1,
      value: 0
    };
    }
    componentDidMount() {
      axios.get("http://localhost:5000/restaurants/".concat(this.props.router.location.state.restaurantid)).then(response => 
      {
        this.setState({
          restaurants: response.data,
        });
          }, error => {
        console.log(error);
      });
      axios.get("http://localhost:5000/restaurants/".concat(this.props.router.location.state.restaurantid).concat("/reviews")).then(response => 
      {
        this.setState({
          reviewslist: response.data,
        });
          }, error => {
        console.log(error);
      });
    }

    render(){
      const {restaurants, reviewslist, expandedId, value} = this.state;
      const handleExpandClick = i => {
        this.setState({
          expandedId: this.state.expandedId === i ? -1 : i
      })}
      return (
      <ThemeProvider theme={Theme}>
        <div className="maincontainer">
              <NameCard>
                <Typography fontFamily="Roboto"variant="h4">{restaurants.restaurantName}</Typography>
                <Typography variant="subtitle2" fontFamily="Roboto" fontWeight="300">{restaurants.location}
        </Typography>
        <Divider sx={{ borderBottomWidth: 3, marginBottom: 1, marginTop: 1,}}/>
        {restaurants.avgrating && ReadStarRating(restaurants.avgrating)}<Typography variant="caption" fontFamily="Roboto" fontWeight="300">({restaurants.numreviews} Reviews)</Typography>
              </NameCard>
              <ContentCard>
                <CustomCardMedia
                  component="img"
                  src={maps[this.state.restaurantid]}                
                />
              </ContentCard>
            {
              this.props.router.location.state.userid != "nouser" && !this.props.router.location.state.isOwner &&
              <div class="user-review">
              <div class = "user-comment">
                <Input id="user-comment" size="small" variant="filled" placeholder = "Write a review..." sx={{width: '95%',margin:'10px'}}/>
              </div>
              <div class = "review-buttons">
                <StyledRating precision={0.5} name="simple-controlled" value={this.state.value} onChange={(event, newValue) => {this.setState({value:newValue})}}/>
                <HeaderButton>Upload File</HeaderButton>
                <HeaderButton>Comment</HeaderButton>
              </div>
            </div> 
            }
              <ReviewsCard>
                {reviewslist && reviewslist.map((review, reviewIndex) => (
                  <ReviewCard key={reviewIndex}>
                    <UserIcon>
                      {review.user[0].firstName && String(review.user[0].firstName).charAt(0).toUpperCase()}
                    </UserIcon>
                    <Box ml={5}> 
                      <Typography fontFamily="Roboto" variant="h6">{review.user[0].firstName.concat(" ").concat(review.user[0].lastName)}</Typography>
                      {ReadStarRating(review.rating)}
                      {ReviewBox(review.review, "Review")}
                      {review.ownerresponse && EstablishmentResponse(review.ownerresponse)}
                    </Box>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                      {
                          this.props.router.location.state.isOwner && this.props.router.location.state.userid !=review.reviewerID &&                 
                           <Button color="secondary" variant="outlined" aria-label="Helpful" startIcon={<AddCommentIcon/>}><Typography variant="body" fontFamily="Roboto" onClick={() => handleExpandClick(reviewIndex)}>Reply As Owner</Typography></Button>
                      }{
                        this.props.router.location.state.userid != "nouser" && this.props.router.location.state.userid !=review.reviewerID && (
                              <Button color="secondary" variant="outlined" aria-label="Helpful" endIcon={<ThumbUpIcon/>}><Typography variant="body" fontFamily="Roboto">{review.helpful} Helpful</Typography></Button>
                                )
                      }
                    {
                        this.props.router.location.state.userid != "nouser" && this.props.router.location.state.userid !=review.reviewerID && (
                              <Button color="secondary" variant="outlined" aria-label="Reply" startIcon={<ThumbDownIcon/>}><Typography variant="body" fontFamily="Roboto">{review.unhelpful} Unhelpful</Typography></Button> 
                              )
                      }{ this.props.router.location.state.userid == review.reviewerID && (
                        <Button color="secondary" variant="outlined" aria-label="Edit" startIcon={<EditIcon/>}><Typography variant="body" fontFamily="Roboto" onClick={() => handleExpandClick(reviewIndex)}>Edit</Typography></Button>
                      )
                      }{ this.props.router.location.state.userid == review.reviewerID && (
                        <Button color="secondary" variant="outlined" aria-label="Delete" endIcon={<DeleteIcon/>}><Typography variant="body" fontFamily="Roboto">Delete</Typography></Button>
                      )
                      }{
                        this.props.router.location.state.userid == "nouser" && (
                            <Button color="secondary" href="/home/register" variant="outlined" aria-label="Helpful" endIcon={<ThumbUpIcon/>}><Typography variant="body" fontFamily="Roboto">{review.helpful} Helpful</Typography></Button>
                              )
                    }
                  {
                      this.props.router.location.state.userid == "nouser" && (
                            <Button color="secondary" href="/home/register" variant="outlined" aria-label="Reply" startIcon={<ThumbDownIcon/>}><Typography variant="body" fontFamily="Roboto">{review.unhelpful} Unhelpful</Typography></Button> 
                            )
                    }
  
  
                      </ButtonGroup>
                      <Collapse in={this.state.expandedId === reviewIndex && review.userid == this.state.id} timeout="auto" unmountOnExit>
                      {<Divider sx={{ marginTop:"10px", borderBottomWidth: 1, bgcolor: "#000000"}}/>}
                      {<Input multiline rows={1} maxRows={5} id="user-comment" size="small" variant="filled" defaultValue  = {review.review} sx={{width: '95%',margin:'10px'}}/>}
                        </Collapse>
                        <Collapse in={this.state.expandedId === reviewIndex && this.state.id < 0} timeout="auto" unmountOnExit>
                      {<Divider sx={{ marginTop:"10px", borderBottomWidth: 1, bgcolor: "#000000"}}/>}
                      {<Input multiline rows={1} maxRows={5} id="user-comment" size="small" variant="filled" label="Reply As Owner" sx={{width: '95%',margin:'10px'}}/>}
                        </Collapse>
                  </ReviewCard>
                ))}
              </ReviewsCard>
            </div>
      </ThemeProvider>
    )}
};

reportWebVitals();