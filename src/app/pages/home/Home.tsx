import { AuthLayout as HomeLayout } from '../../../auth/pages/layout/';
import { Box, Grid, Button } from '@mui/material'

export const Home = () => {
  return (
    <HomeLayout props={{ title: 'EventBuddy', minHeight: '60px', isHome: true }} >
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
