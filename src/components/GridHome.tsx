import { Button, styled, Typography, Link, Grid, Paper, Box } from '@mui/material';
import pageBodyImage from '../assets/images/ImageHome.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
  ...theme.typography.body2,
  /// padding: theme.spacing(1),
  textAlign: 'center',
  minWidth: '200px',
  color: theme.palette.text.primary
}));

export default function BodyPage() {
  return (
    <Box component='nav' sx={{
      width: '1100px',
      display: 'flex',
      direction: 'row',
      justifyContent: 'center'
    }} >
      <Grid container sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '70vh'
      }}>
        {/** Grid for image */}
        <Grid item xs={6} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
          <img
            style={{ display: 'block' }}
            src={pageBodyImage}
            alt='product_image'
          />
        </Grid>

        {/** Grid for text and button */}
        <Grid item xs={12} sm={6} sx={{
          direction: 'column',
          justifyContent: 'center',
          alignItems: 'center'
          /// borderWidth: 1,
          /// borderStyle: 'solid'
        }}>
          <Item elevation={0}>
            <Typography component='h1' variant='h3' sx={{ mb: 1, color: 'white' }}>EVENT BUDDY</Typography>
          </Item>
          <Item elevation={0}>
            <Link href='login' variant='h5'>ABOUT US</Link>
          </Item>
          <Item elevation={0}>
            <Button
            href="register"
            fullWidth variant="contained"
            sx={{
              mt: 6,
              height: { sm: '50%', xs: '100%' },
              maxWidth: { xs: '10%', sm: '50%' },
              minWidth: '20%'
            }}
            >
            GET STARTED
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
