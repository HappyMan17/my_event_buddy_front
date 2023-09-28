import React from 'react'
import { Box, createTheme, Grid, TextField, ThemeProvider, Button, Link } from '@mui/material'
import Typography from '@mui/material/Typography'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Your Website
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const defaultTheme = createTheme();

export const Login = () => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password')
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ display: 'flex', direction: 'row', margin: '0' }} >
        <Grid container sx={{
          background: 'linear-gradient(45deg, #253469, #525D93, #111E31, #230E30)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh'
        }}>
          <Grid item xs={12} sm={8} sx={{
            bgcolor: 'white',
            height: { sm: '500px', xs: '100vh' },
            maxWidth: '500px',
            minWidth: '300px',
            borderRadius: { sm: 8, xs: 0 }
          }}>
            <Box sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Typography component="h1" variant="h5">Login</Typography>
              <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required fullWidth
                  id="password"
                  label="Contraseña"
                  type="password"
                  name="password"
                />
                <Button
                  type="submit"
                  fullWidth variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  SING IN
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">¿Olvidaste tu contraseña?</Link>
                  </Grid>
                  <Grid item xs>
                    <Link href="#" variant="body2">¿No tienes cuenta? Registrate</Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
