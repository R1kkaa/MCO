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
import { useLocation } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();
  var id = "nouser"
  var isOwner = false
  var currlocation = "main"
  if(location.state){
    id = location.state.userid
    isOwner = location.state.isOwner
    currlocation = location.state.currlocation
  }
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
          {currlocation != "home" &&          
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={()=>navigate("/home/main/",{ state: { userid: id, isOwner: isOwner, currlocation: "home"}})}>
            Home</HeaderButton>}
          {(currlocation == "home" || (currlocation == "profile" && id!="nouser")) &&
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={()=>navigate("/home/form",{ state: { userid: id, isOwner: isOwner, currlocation: "form"}})}>
          Submit Restaurant</HeaderButton>
          }
            {id == "nouser" &&           
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/register">
          Register</HeaderButton>}
          {id == "nouser" &&          
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/login">
          Login</HeaderButton>}
          {currlocation != "profile" && id != "nouser" && !isOwner &&
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} onClick={()=>navigate("/home/main/user/".concat(id),{ state: { userid: id, viewuser: id, currlocation: "profile"}})}>
          Profile </HeaderButton>
          }
          {id != "nouser" &&
          <HeaderButton variant="outlined" style={{boxShadow: '2px 3px 5px #000000'}} href="/home/login">
          Sign Out</HeaderButton>
          }
          </ThemeProvider>
          </span>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
    </Box>
  );
}