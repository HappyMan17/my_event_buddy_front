import { Button, styled, Typography, Link, Grid, Paper, Box } from '@mui/material';
import backgroundImage from '../assets/images/ImageHome.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'center',
  minWidth: '200px',
  color: theme.palette.text.primary
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }} >
      <Grid container rowSpacing={0} columnSpacing={{ xs: 12, sm: 15, md: 30 }} sx={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '70vh'
      }}>
        <Grid item xs={6} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
          <img
            style={{ display: 'block' }}
            src={backgroundImage}
            alt='Mi imagen'
          />
        </Grid>
        <Grid item xs={6} sx={{
          direction: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          borderWidth: 1,
          borderStyle: 'solid'
        }}>
          <Item elevation={0}>
            <Typography component="h1" variant="h3" sx={{ mb: 1, color: 'white' }}>EVENT BUDDY</Typography>
            <Link href="login" variant="h5">ABOUT US</Link>
            <Button
            href="register"
            fullWidth variant="contained"
            sx={{ mt: 6 }}
            >
            GET STARTED
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
