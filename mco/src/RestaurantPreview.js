import React from 'react';
import reportWebVitals from './reportWebVitals';
import { Box, Typography} from '@mui/material';
import {Theme} from'./themes';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';
import './RestaurantPreview.css';
import { Restaurant } from '@mui/icons-material';
export const Body = () => {

  var Props = {
    hoverShadow: Number,
  };
  const options = {
    shouldForwardProp: (prop) => prop !== 'hoverShadow',
  };

  const Item = styled(Card, options)(({ theme=Theme, hoverShadow = 1 }) => ({
    backgroundColor: Theme.palette.primary.light,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: '#000000',
    fontFamily: 'Italiana-Regular',
    paddingLeft: '35px',
    ':hover': {
      boxShadow: theme.shadows[hoverShadow]},
  }));

  const Restaurants = ["Jollibee","McDonalds","KFC","Bonchon"]
  const Location = ["Taft, Manila City","Taft, Manila City","Taft, Manila City","Taft, Manila City"]
  return(
    <ThemeProvider theme={Theme}>
    <div class="maincontainer">
    <Stack spacing={2}>
    {Restaurants.map((item, index) => (
      <Item key={index}><Typography variant="h4">{item} - {Location[index]}</Typography></Item>
    ))}</Stack>
</div>
</ThemeProvider>
  );
};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
