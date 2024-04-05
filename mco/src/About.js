import React from 'react';
import './css/RestaurantPreview.css';

import { Theme } from './themes';
import { Box, Typography, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

export function Body() {
  const packagesList = [
    'Axios', 'Body-Parser', 'Concurrently', 'Connect-mongo', 'Cookie-parser', 'Cors',
    'Express', 'Express-session', 'File-loader', 'Fs', 'Material-UI (MUI)','Mongodb', 'Mongoose', 'Multer',
    'Nodemon', 'Passport', 'Passport-local', 'Pasport-local-mongoose', 'React', 'React-scripts',
    'React-dom', 'React-fancy-circular-carousel', 'Stack', 'Type-face-roboto', 'Web-vitals'
  ];

  return (
    <ThemeProvider theme={Theme}>
      <Box className="maincontainer" mt={2} display="flex" flexDirection="column" alignItems="center">
        <Box width="95%" mb={4} p={2} boxShadow={3} bgcolor={Theme.palette.primary.main}>
          <Typography align="center" variant='h4' color="black" fontFamily="Roboto" fontWeight="500">About Us</Typography>
          <Typography align="left" variant='body1' color="black" fontFamily="Roboto" fontWeight="100">Welcome to <i>Munch Me</i>, your one-stop destination for exploring Taft's vibrant food scene. Launched in early 2024, we're like Yelp, but exclusively for Taft. Our platform offers insightful reviews and precise addresses for all the must-visit restaurants in town. In a bustling city like Taft, where life can be stressful, we believe that finding good food is essential for relaxation and enjoyment. From cozy cafes to upscale dining, <i>Munch Me</i> helps you uncover hidden gems and popular hotspots alike. Join us in discovering the flavors of Taft, one bite at a time. </Typography>
        </Box>

        <Box width="95%" mb={4} p={2} boxShadow={3} bgcolor={Theme.palette.primary.main}>
          <Typography align="center" variant='h4' color="black" fontFamily="Roboto" fontWeight="500">Packages Used</Typography>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <ul>
                {packagesList.slice(0, Math.ceil(packagesList.length / 2)).map((packageItem, index) => (
                  <li key={index}>
                    <Typography align="left" variant='body1' color="black" fontFamily="Roboto" fontWeight="100">{packageItem}</Typography>
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={6}>
              <ul>
                {packagesList.slice(Math.ceil(packagesList.length / 2)).map((packageItem, index) => (
                  <li key={index}>
                    <Typography align="left" variant='body1' color="black" fontFamily="Roboto" fontWeight="100">{packageItem}</Typography>
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Box>

        <Box width="95%" mb={4} p={2} boxShadow={3} bgcolor={Theme.palette.primary.main}>
          <Typography align="center" variant='h4' color="black" fontFamily="Roboto" fontWeight="500">Contributions</Typography>
          <Box mt={2} display="flex" justifyContent="center">
            <Box mr={2} p={2} boxShadow={1} bgcolor="primary.light" color="black" width={180} height={120}>
              <Typography align="center" variant='body2' fontFamily="Roboto" fontWeight="500">Jeka Cataluna</Typography>
              <Typography align="center" variant='body2' fontFamily="Roboto" fontWeight="100">Reviews and Restaurants Frontend</Typography>
            </Box>
            <Box mr={2} p={2} boxShadow={1} bgcolor="primary.light" color="black" width={180} height={120}>
            <Typography align="center" variant='body2' fontFamily="Roboto" fontWeight="500">Sai Kabiling</Typography>
              <Typography align="center" variant='body2' fontFamily="Roboto" fontWeight="100">Reviews and Restaurants Frontend</Typography>            </Box>
            <Box mr={2} p={2} boxShadow={1} bgcolor="primary.light" color="black" width={180} height={120}>
            <Typography align="center" variant='body2' fontFamily="Roboto" fontWeight="500">Hermione Marucot</Typography>
              <Typography align="center" variant='body2' fontFamily="Roboto" fontWeight="100">Profile Frontend</Typography>            
              </Box>
            <Box mr={2} p={2} boxShadow={1} bgcolor="primary.light" color="black" width={180} height={120}>
            <Typography align="center" variant='body2' fontFamily="Roboto" fontWeight="500">Angelo Geronimo</Typography>
              <Typography align="center" variant='body2' fontFamily="Roboto" fontWeight="100">Backend and Database</Typography>
                          </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
