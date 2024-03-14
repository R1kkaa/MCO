import React from 'react';
import reportWebVitals from './reportWebVitals';
import './RestaurantPreview.css';
import { Box, Typography, Button, Rating, CardMedia, Avatar, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './themes';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import  axios  from 'axios';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

export const HeaderButton2 = styled(Button)(({ theme }) => ({
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

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.65),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  fontFamily: 'Italiana-Regular',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  fontFamily: 'Italiana-Regular',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));

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
  height: '600px', 
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
  width: '100%', 
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
  var id = "nouser"
  var isOwner = false
  if(location.state){
    id = location.state.userid
    isOwner = location.state.isOwner
  }
  return <View        
        router={{ location, navigate, id, isOwner}}
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
                <Typography variant="subtitle1" fontFamily="Roboto" fontWeight="300">{restaurants.location}
                <Divider sx={{ borderBottomWidth: 3, marginBottom: 1, marginTop: 1,}}/>

        </Typography>
        <Typography display="block" variant="body2" fontFamily="Roboto" fontWeight="300">{restaurants.description}
        </Typography>
        <Typography display="block" variant="body2" fontFamily="Roboto" fontWeight="300">Landmarks: {restaurants.landmarks}
        </Typography>
        <Divider sx={{ borderBottomWidth: 3, marginBottom: 1, marginTop: 1,}}/>
        {restaurants.avgrating && ReadStarRating(restaurants.avgrating)}<Typography variant="caption" fontFamily="Roboto" fontWeight="300">({restaurants.numreviews} Reviews)</Typography>
              </NameCard>
              <ContentCard>
                {restaurants.mapImage &&
                <CustomCardMedia
                component="img"
                image={require('./images/'.concat(restaurants.mapImage))}                
              />
                }
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
                          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Reviews"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
              <ReviewsCard>
                {reviewslist && reviewslist.map((review, reviewIndex) => (
                  <ReviewCard key={reviewIndex}>
                    {/* fix the alignment, track ownership */}
                    <Box ml={5}> 
                    <div class="align">
                    <UserIcon sx={{marginTop:"9px", marginLeft:"10px"}}>
                      {review.user[0].firstName && String(review.user[0].firstName).charAt(0).toUpperCase()}
                    </UserIcon>
                    {review.user[0.].firstName && <Button variant="text" onClick={()=>this.props.router.navigate('/home/main/user/'.concat(review.user[0]._id), { state: { userid: this.props.router.id, viewuser : review.user[0]._id, currlocation: "profile", isOwner: this.props.router.isOwner}})} color="secondary">
                      <Typography  fontFamily="Roboto" variant="h6">{review.user[0].firstName.concat(" ").concat(review.user[0].lastName)}</Typography>
                      </Button>}
                      </div>
                      {ReadStarRating(review.rating)}
                      {ReviewBox(review.review, "Review")}
                      {review.ownerresponse && EstablishmentResponse(review.ownerresponse)}
                    </Box>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                      {
                          this.props.router.location.state.isOwner && this.props.router.location.state.userid !=review.reviewerID &&  restaurants.owner == this.props.router.id && this.props.router.location.state.isOwner &&               
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
                      <Collapse in={this.state.expandedId === reviewIndex && !this.props.router.location.state.isOwner} timeout="auto" unmountOnExit>
                      {<Divider sx={{ marginTop:"10px", borderBottomWidth: 1, bgcolor: "#000000"}}/>}
                      {<Input multiline rows={1} maxRows={5} id="user-comment" size="small" variant="filled" defaultValue  = {review.review} sx={{width: '95%',margin:'10px'}}/>}
                      <HeaderButton2>Edit</HeaderButton2>
                        </Collapse>
                        <Collapse in={this.props.router.id == restaurants.owner && this.state.expandedId === reviewIndex && this.props.router.location.state.isOwner } timeout="auto" unmountOnExit>
                      {<Divider sx={{ marginTop:"10px", borderBottomWidth: 1, bgcolor: "#000000"}}/>}
                      {<Input multiline rows={1} maxRows={5} id="user-comment" size="small" variant="filled" label="Reply As Owner" sx={{width: '95%',margin:'10px'}}/>}
                      <HeaderButton2>Reply As Owner</HeaderButton2>
                        </Collapse>
                  </ReviewCard>
                ))}
              </ReviewsCard>
            </div>
      </ThemeProvider>
    )}
};

reportWebVitals();