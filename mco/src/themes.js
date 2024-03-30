import * as React from 'react';
import { createTheme} from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./css/index.css";

export const Theme = createTheme({
    palette: {
      primary: {
        light: '#F2b85f',
        main: '#F19E23',
        dark: '#8c5808',
      },
      secondary:{
        light: '#FFCD82',
        main: '#8c5808',
        dark: '#8c5808'
      },
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f'
      },
      info: {
        light: '#4fc3f7',
        main: '#29b6f6',
        dark: '#0288d1'
      },
      success: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f'
      }
    },
    typography:{
      fontFamily: ['Roboto-Thin','Italiana-Regular','"Helvetica Neue"'].join(','),
    },
    shape: {
      borderRadius: 8,
    }, 
  });