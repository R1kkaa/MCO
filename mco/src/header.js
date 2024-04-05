import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import './css/header.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {Theme} from'./themes';
import { ThemeProvider } from '@mui/material/styles';
import logo from './images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import  axios  from 'axios';
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Search = styled('div')(({ theme }) => ({
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
export const HeaderButton = styled(Button)(({ theme }) => ({
  color: '#454545',
  backgroundColor: Theme.palette.primary.main, 
  '&:hover': {
    backgroundColor: '#bf7e1d',
    color: 'black',
  },
  minWidth: '180px', 
  fontFamily: "Roboto" ,
  fontWeight: "400"
  
}));

export default function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  var [id, setID] = useState("nouser")
  var [isOwner, setOwner] = useState("false")
  var currlocation = props.location
  var [searchParams, setSearchParams] = useState("")
  const handlesearch = (event) => {
    setSearchParams(event.target.value.toLowerCase().trim())
  }
  const signout = () => {
    axios.post("http://localhost:5000/signout").then(response =>
    navigate("/home/login"))
  }


  useEffect(() => {
    const check = async () => {
      axios.post("http://localhost:5000/logged").then(response => {
        if(response.data.success){
            setID(response.data.user._id)
            setOwner(response.data.user.isOwner)
        }else{
            setID("nouser")
            setOwner(false)
        }
      })
    }
    check()}, 
  );

  return (
    <Box sx={{ flexGrow: 1}} >
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar >
        <Box
        onClick={()=>navigate("/home/about")}
      component="img"
      sx={{
        height: '60px',
        width: 'auto',
      }}
      src={logo}
    />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Restaurants         |         Cuisine         |         Food"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handlesearch}
              onKeyUp={(event) => {
                if (event.key === "Enter" && searchParams != "") {
                  navigate("/home/main?search=".concat(searchParams),{ state: { userid: id, isOwner: isOwner, currlocation: "home"}})
                }
                if (event.key === "Enter" && searchParams == "") {
                  navigate("/home/main", { state: { userid: id, isOwner: isOwner, currlocation: "home"}})
              }
            }}              
            />
          </Search>
          <span class="buttongroup2">
          <ThemeProvider theme={Theme}>
          {          
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={()=>navigate("/home/main/",{ state: { userid: id, isOwner: isOwner, currlocation: "home"}})}>
            Home</HeaderButton>}
            {id == "nouser" &&           
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/register">
          Register</HeaderButton>}
          {id == "nouser" &&          
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/login">
          Login</HeaderButton>}
          {id != "nouser" &&
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={()=>navigate("/home/main/user/".concat(id),{ state: { userid: id, viewuser: id, currlocation: "profile"}})}>
          Profile </HeaderButton>
          }
          {id != "nouser" &&
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={()=>signout()}>
          Sign Out</HeaderButton>
          }
          </ThemeProvider>
          </span>
        </Toolbar>
      </AppBar>
    </Box>
  );
}