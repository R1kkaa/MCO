import React from 'react';
import reportWebVitals from './reportWebVitals';
import './css/RestaurantPreview.css';
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
import { VisuallyHiddenInput } from './Register';
import { useRef } from 'react';
import Delete from '@mui/icons-material/Delete';
axios.defaults.withCredentials = true

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
  maxHeight: '80vh', 
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
  let newreviewRef = useRef();
  let editreviewRef = useRef();

  var id = "nouser"
  var isOwner = false
  if(location.state){
    id = location.state.userid
    isOwner = location.state.isOwner
  }    

  return <View        
        router={{ location, navigate, id, isOwner, newreviewRef, editreviewRef}}
      />
}

export class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantid: window.location.href.split("/")[6],
      id: "nouser",
      isOwner: false,
      restaurants: [],
      reviewslist: [],
      expandedId: -1,
      value: 0,
      editvalue: 0,
      image: null,
      selectedImage : null,
      imageUrl: null,
      currreview: "",
      editreview: "",
      searchparams: "",
      ownerresponse: "",
    };
    }
    componentDidMount() {
      axios.get("http://localhost:5000/restaurants/".concat(this.state.restaurantid)).then(response => 
      {
        this.setState({
          restaurants: response.data,
        });
          }, error => {
        console.log(error);
      });
      axios.get("http://localhost:5000/restaurants/".concat(this.state.restaurantid).concat("/reviews")).then(response => 
      {
        this.setState({
          reviewslist: response.data.reverse(),
        });
          }, error => {
        console.log(error);
      });
      axios.post("http://localhost:5000/logged").then(response => {
        if(response.data.success){
          this.setState({
            id: response.data.user._id,
            isOwner: response.data.user.isOwner
          })
        }else{
          this.setState({
            id: "nouser",
            isOwner: false
          })
        }
      })
    }
    
    getFileInfo = (e) => {
      this.setState({
        selectedImage: e.target.files[0]
    },  () => {
      if (this.state.selectedImage) {
        this.setState({
          imageUrl: URL.createObjectURL(this.state.selectedImage)
      })
      }
      })    
         const formData = new FormData(); 
         //FILE INFO NAME WILL BE "my-image-file"
         formData.append('my-image-file', e.target.files[0]);
         this.setState({
          image: formData
      })
      }

    formvalidation = () => {
      if(this.state.currreview.trim() == ""){
        alert("Review cannot be empty.")
      }else{
        let data = {
          userid: this.props.router.location.state.userid,
          restaurantid: this.state.restaurantid,
          review: this.state.currreview,
          rating: this.state.value,
        }
        axios.post('http://localhost:5000/review', data).then(response => {
          if(this.state.selectedImage){
            const newimage = new FormData(); 
            const filename = String(response.data).concat("_review.")
            const type = this.state.selectedImage.type.split("image/")[1]
            newimage.append('my-image-file', this.state.selectedImage, filename+type)
            newimage.append('id', response.data)
            axios.post('http://localhost:5000/review/upload', newimage).then(response2 => {
              window.location.reload();
                      })
        }
        else{
          window.location.reload();
        }})
      }
    }
    handletype = (e) => {
      this.setState({
        currreview: e.target.value
    })
    }

    editreview = (e) => {
      this.setState({
        editreview: e.target.value
    })
  }
  editownerresponse = (e) => {
    this.setState({
      ownerresponse: e.target.value
  })
}

  editSearchParams = (e) => {
    this.setState({
      searchparams: e.target.value.toLowerCase().trim()
  })
}
    submitedit = (reviewIndex) => {
      let review = {
        reviewid: this.state.reviewslist[reviewIndex]["_id"],
        review: this.state.editreview,
        rating: this.state.editvalue,
        restaurantid:this.state.restaurantid
      }
      axios.post("http://localhost:5000/reviews/".concat(this.state.reviewslist[reviewIndex]["_id"]).concat("/edit"), review).then(response => {
        window.location.reload()
      })
    }
    submitownerreply = (reviewIndex) => {
      let review = {
        reviewid: this.state.reviewslist[reviewIndex]["_id"],
        ownerresponse: this.state.ownerresponse,
      }
      axios.post("http://localhost:5000/reviews/".concat(this.state.reviewslist[reviewIndex]["_id"]).concat("/replyowner"), review).then(response => {
        window.location.reload()
      })
    }
    deleteownerreply = (reviewIndex) => {
      let review = {
        reviewid: this.state.reviewslist[reviewIndex]["_id"],
        ownerresponse: "",
      }
      axios.post("http://localhost:5000/reviews/".concat(this.state.reviewslist[reviewIndex]["_id"]).concat("/replyowner"), review).then(response => {
        window.location.reload()
      })
    }

    submitdelete = (reviewIndex) => {
      let data = {
        restaurantid:this.state.restaurantid
      }
      axios.post("http://localhost:5000/reviews/".concat(this.state.reviewslist[reviewIndex]["_id"]).concat("/delete"), data).then(response => {
        window.location.reload()
      })
    }
    handlehelpful(reviewIndex, mark){
      let data = {
        userid: this.state.id,
        mark: mark
      }
      if(!this.state.isOwner)
{      axios.post("http://localhost:5000/reviews/".concat(this.state.reviewslist[reviewIndex]._id).concat("/mark"), data).then(response => {
        axios.post("http://localhost:5000/marks/".concat(this.state.reviewslist[reviewIndex]._id)).then(res => {
          let reviewslist = this.state.reviewslist
          reviewslist[reviewIndex].helpful = res.data.helpful
          reviewslist[reviewIndex].unhelpful = res.data.unhelpful
          this.setState({
            reviewslist: reviewslist
          })
        })
      })}
    }
    render(){
      const {restaurants, reviewslist, expandedId, value, editvalue, image, selectedImage, imageUrl} = this.state;

      const handleExpandClick = i => {
        this.setState({
          expandedId: this.state.expandedId === i ? -1 : i,
          editvalue: reviewslist[i].rating,
          editreview: reviewslist[i].review
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
                image={process.env.PUBLIC_URL+restaurants.mapImage}                
              />
                }
              </ContentCard>
            {
              //add new reviews
              this.state.id != "nouser" && !this.state.isOwner &&
              <div class="user-review">
              <div class = "user-comment">
              <Typography variant='h6' color="primary.dark" fontFamily="Roboto" fontWeight="200"><div>Write a Review:</div></Typography>
              {<Input multiline rows={1} onChange={this.handletype} maxRows={5} id="user-comment" size="small" variant="filled"  sx={{width: '95%',margin:'10px'}}/>}
                {this.state.imageUrl && this.state.selectedImage && (
                  <div class="user-review-image">
        <Box  textAlign="center">
          <Typography variant='body2' color="primary.dark" fontFamily="Roboto" fontWeight="100"><div>Image Preview:</div></Typography>
          <img src={imageUrl} alt={selectedImage.name} width="400px" height="300px" />
        </Box>
        </div>
      )} 
              </div>
              <div class = "review-buttons">
                <StyledRating precision={0.5} name="simple-controlled" value={this.state.value} onChange={(event, newValue) => {this.setState({value:newValue})}}/>
                <HeaderButton component="label">
                <VisuallyHiddenInput type="file" onChange={this.getFileInfo} accept="image/*"/>
                Upload Image 
                </HeaderButton>                
                <HeaderButton onClick={this.formvalidation}>Comment</HeaderButton>
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
            onChange={this.editSearchParams}/>
          </Search>
              <ReviewsCard>
                {reviewslist && reviewslist.map((review, reviewIndex) => (
                  (review.ownerresponse.toLowerCase().includes(this.state.searchparams) || review.review.toLowerCase().includes(this.state.searchparams) || (review.user[0].firstName.concat(" ").concat(review.user[0].lastName)).toLowerCase().includes(this.state.searchparams)) && <ReviewCard key={reviewIndex}>
                    <Box ml={5}> 
                    <div class="align">
                    <UserIcon sx={{marginTop:"9px", marginLeft:"10px"}}>
                      {review.user[0].firstName && String(review.user[0].firstName).charAt(0).toUpperCase()}
                    </UserIcon>
                    {review.user[0.].firstName && <Button variant="text" onClick={()=>this.props.router.navigate('/home/main/user/'.concat(review.user[0]._id), { state: { userid: this.state.id, viewuser : review.user[0]._id, currlocation: "profile", isOwner: this.state.isOwner}})} color="secondary">
                      <Typography  fontFamily="Roboto" variant="h6">{review.user[0].firstName.concat(" ").concat(review.user[0].lastName)}</Typography>
                      </Button>}
                      </div>
                      {ReadStarRating(review.rating)}
                      {ReviewBox(review.review, "Review", review.edited, review.imageurl)}
                      {review.ownerresponse && EstablishmentResponse(review.ownerresponse)}
                    </Box>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                      {
                          this.state.isOwner && this.state.id !=review.reviewerID &&  restaurants.owner == this.props.router.id && this.state.isOwner && review.ownerresponse == "" &&            
                           <Button color="secondary" variant="outlined" aria-label="Reply As Owner" startIcon={<AddCommentIcon/>}><Typography variant="body" fontFamily="Roboto" onClick={() => handleExpandClick(reviewIndex)}>Reply As Owner</Typography></Button>
                      }{
                        this.state.isOwner && this.state.id !=review.reviewerID &&  restaurants.owner == this.props.router.id && this.state.isOwner && review.ownerresponse != "" &&            
                         <Button color="secondary" variant="outlined" aria-label="Edit Reply As Owner" startIcon={<EditIcon/>}><Typography variant="body" fontFamily="Roboto" onClick={() => handleExpandClick(reviewIndex)}>Edit Reply</Typography></Button>
                    }
                    {
                        this.state.isOwner && this.state.id !=review.reviewerID &&  restaurants.owner == this.props.router.id && this.state.isOwner && review.ownerresponse != "" &&            
                         <Button color="secondary" variant="outlined" aria-label="Edit Reply As Owner" endIcon={<DeleteIcon/>}><Typography variant="body" fontFamily="Roboto" onClick={() => this.deleteownerreply(reviewIndex)}>Delete Reply</Typography></Button>
                    }
                      {
                        this.state.id != "nouser" && this.state.id !=review.reviewerID && (
                              
                              /*mark helpful*/
                              <Button color="secondary" variant="outlined" aria-label="Helpful" onClick={()=>this.handlehelpful(reviewIndex, true)} endIcon={<ThumbUpIcon/>}><Typography variant="body" fontFamily="Roboto">{review.helpful} Helpful</Typography></Button>
                                )
                      }
                    {
                              /*mark unhelpful*/
                              this.state.id != "nouser" && this.state.id !=review.reviewerID && (
                              <Button color="secondary" variant="outlined" aria-label="Unhelpful" onClick={()=>this.handlehelpful(reviewIndex, false)}startIcon={<ThumbDownIcon/>}><Typography variant="body" fontFamily="Roboto">{review.unhelpful} Unhelpful</Typography></Button> 
                              )
                      }{ this.state.id == review.reviewerID && (
                        <Button color="secondary" variant="outlined" aria-label="Edit" startIcon={<EditIcon/>}><Typography variant="body" fontFamily="Roboto" onClick={() => handleExpandClick(reviewIndex)}>Edit</Typography></Button>
                      )
                      }{ this.state.id == review.reviewerID && (
                        <Button color="secondary" variant="outlined" aria-label="Delete" endIcon={<DeleteIcon/>}><Typography variant="body" fontFamily="Roboto" onClick={() => this.submitdelete(reviewIndex)} >Delete</Typography></Button>
                      )
                      }{
                        this.state.id == "nouser" && (
                            <Button color="secondary" href="/home/register" variant="outlined" aria-label="Helpful" endIcon={<ThumbUpIcon/>}><Typography variant="body" fontFamily="Roboto">{review.helpful} Helpful</Typography></Button>
                              )
                    }
                  {
                      this.state.id == "nouser" && (
                            <Button color="secondary" href="/home/register" variant="outlined" aria-label="Reply" startIcon={<ThumbDownIcon/>}><Typography variant="body" fontFamily="Roboto">{review.unhelpful} Unhelpful</Typography></Button> 
                            )
                    }
                      </ButtonGroup>
                    {/*edit review*/}
                      <Collapse in={this.state.expandedId === reviewIndex && !this.state.isOwner} timeout="auto" unmountOnExit>
                      {<Divider sx={{ marginTop:"10px", borderBottomWidth: 1, bgcolor: "#000000"}}/>}
                      {<Input multiline rows={1} maxRows={5} id="user-comment" onChange={this.editreview} size="small" variant="filled" defaultValue  = {review.review} sx={{width: '100%',margin:'10px'}}/>}
                      <div class = "review-buttons2">
                      <StyledRating precision={0.5} name="edit-rating" value={this.state.editvalue} onChange={(event, newValue2) => {this.setState({editvalue:newValue2})}}/>
                      <HeaderButton2 onClick={() => this.submitedit(reviewIndex)}>Edit</HeaderButton2>
                      </div>
                        </Collapse>

                    {/*reply as owner*/}
                        <Collapse in={this.props.router.id == restaurants.owner && this.state.expandedId === reviewIndex && this.state.isOwner} timeout="auto" unmountOnExit>
                      {<Divider sx={{ marginTop:"10px", borderBottomWidth: 1, bgcolor: "#000000"}}/>}
                      {<Input multiline rows={1} maxRows={5} id="user-comment" size="small" variant="filled" label="Reply As Owner" onChange={this.editownerresponse} defaultValue = {review.ownerresponse} sx={{width: '95%',margin:'10px'} }/>}
                      <HeaderButton2 onClick={()=> this.submitownerreply(reviewIndex)}>Reply As Owner</HeaderButton2>
                        </Collapse>
                  </ReviewCard>
                ))}
              </ReviewsCard>
            </div>
      </ThemeProvider>
    )}
};

reportWebVitals();