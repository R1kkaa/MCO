import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import './header.css';
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
import { useSearchParams } from 'react-router-dom';
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

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

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
  minWidth: '150px', 
  fontFamily: "Roboto" ,
  fontWeight: "400"
  
}));

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1}} >
      <HideOnScroll>
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar >
        <Box
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
            />
          </Search>
          <span class="buttongroup2">
          <ThemeProvider theme={Theme}>
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/main?userid=null">
            Home</HeaderButton>
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/register">
            Register</HeaderButton>
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/login">
            Login</HeaderButton>
            </ThemeProvider>
          </span>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
    </Box>
  );
}
export function Header2(props) {

  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('userid');  
  function viewprofile(){
    let link = "/home/main/user?userid="
      link = link.concat(String(id)).concat("&viewuserid=").concat(String(id))
    navigate(link, {state:{id:id}})
    return null;
  }
  function viewform(){
    let link = "/home/form?userid="
      link = link.concat(String(id))
    navigate(link, {state:{id:id}})
    return null;
  }


  return (
    <Box sx={{ flexGrow: 1}} >
      <HideOnScroll>
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none',}}>
        <Toolbar >
        <Box
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
            />
          </Search>
          <span class="buttongroup2">
          <ThemeProvider theme={Theme}>
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={viewform}>
            Submit Restaurant</HeaderButton>
          {id >= 0 && <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={viewprofile}>
            Profile</HeaderButton>}
            {id >= 0 &&           <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/login">
            Sign Out</HeaderButton>}
            {
            id < 0 && <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/register">
            Sign Out</HeaderButton> 
          }{
            id == "null" && <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/register">
            Register</HeaderButton> 
          }{
            id == "null" && <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/register">
            Login</HeaderButton> 
          }
          
            </ThemeProvider>
          </span>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
    </Box>
  );
}
export function Header3(props) {

  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('userid');  
    function viewprofile(){
    let link = "/home/main?userid="
      link = link.concat(String(id))
    navigate(link, {state:{id:id}})
    return null;
  }
  function viewform(){
    let link = "/home/form?userid="
      link = link.concat(String(id))
    navigate(link, {state:{id:id}})
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1}} >
      <HideOnScroll>
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none',}}>
        <Toolbar >
        <Box
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
            />
          </Search>
           <span class="buttongroup2">
          <ThemeProvider theme={Theme}>
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={viewform}>
            Submit Restaurant</HeaderButton>
          {id >= 0 ?           <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={viewprofile}>
            Home</HeaderButton> : <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/register">
            Register</HeaderButton>}
            {id >= 0 ?           <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/login">
            Sign Out</HeaderButton> : <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/login">
            Login</HeaderButton>}
            </ThemeProvider>
          </span>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
    </Box>
  );
}
export function Header4(props) {

  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('userid');  
    function viewhome(){
    let link = "/home/main?userid="
      link = link.concat(String(id))
    navigate(link, {state:{id:id}})
    return null;
  }
  function viewprofile(){
    let link = "/home/main/user?userid="
      link = link.concat(String(id)).concat("&viewuserid=").concat(String(id))
    navigate(link, {state:{id:id}})
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1}} >
      <HideOnScroll>
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none',}}>
        <Toolbar >
        <Box
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
            />
          </Search>
           <span class="buttongroup2">
          <ThemeProvider theme={Theme}>
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={viewhome}>
            Home</HeaderButton>
          {id >= 0 && <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={viewprofile}>
            Profile</HeaderButton>}
            {id >= 0 &&           <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/login">
            Sign Out</HeaderButton>}
            {
            id < 0 && <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/register">
            Sign Out</HeaderButton> 
          }{
            id == "null" && <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/register">
            Register</HeaderButton> 
          }{
            id == "null" && <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/register">
            Login</HeaderButton> 
          }
            </ThemeProvider>
          </span>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
    </Box>
  );
}