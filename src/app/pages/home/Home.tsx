import * as React from 'react';
import { Box, Grid } from '@mui/material'
import AppBar from '../../../components/AppBar';
import GridHome from '../../../components/GridHome';

export const Home = () => {
  return (
    <React.Fragment>
      <Grid container sx={{
        //background: 'linear-gradient(45deg, #253469, #525D93, #111E31, #230E30)',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat',
        display: 'auto',
        justifyContent: 'center',
        width: '100%',
        height: '100vh'
      }}>
        <Box sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <AppBar />
          <GridHome />
        </Box>
      </Grid>
    </React.Fragment>
  );
};
