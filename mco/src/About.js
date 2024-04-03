import React from 'react';
import './css/RestaurantPreview.css';

import {Theme} from'./themes';
import { Box, Typography} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

export function Body(){
    return(
    <ThemeProvider theme={Theme}>
            <div class="maincontainer">
            <Typography align="center" variant='h3' color="primary.dark" fontFamily="Roboto" fontWeight="100">About Us</Typography>
            <Typography align="left" variant='h6' color="primary.dark" fontFamily="Roboto" fontWeight="100">Insert NPM Packages Used and Contributions Here</Typography>
            </div>
    </ThemeProvider>
    );
  }; 