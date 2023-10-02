import React from 'react'
import { Box, Grid, TextField, Button, Link } from '@mui/material'
import { AuthLayout } from './layout';
import { Copyright } from '../../components';

export const Login = () => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email')?.toString() ?? '',
      password: data.get('password')?.toString() ?? ''
    }
    console.log({ user });
  };

  return (
    <AuthLayout props={{ title: 'Login', minHeight: '500px' }} >
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
            <Link href="register" variant="body2">¿No tienes cuenta? Registrate</Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </AuthLayout>
  );
};
