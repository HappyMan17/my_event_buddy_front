import { HomeLayout } from './layout';
import { Box, Grid, Button } from '@mui/material'

export const Home = () => {
  return (
    <HomeLayout props={{ title: 'EventBuddy' }} >
      <Box>
        <Grid container>
        </Grid>
      </Box>
      <Box>
        <Grid>
          <Button>Home</Button>
          <Button>About</Button>
          <Button href='login'>Sing in</Button>
          <Button href='register'>Log in</Button>
        </Grid>
      </Box>
    </HomeLayout>
  );
};
