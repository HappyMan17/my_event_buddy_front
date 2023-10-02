import React from 'react'
import { Box, Grid, TextField, Button, Link } from '@mui/material'
import { AuthLayout } from './layout';
import { Copyright } from '../../components';

export const Register = () => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password')
    });
  };

  return (
    <AuthLayout props={{ title: 'Register', minHeight: '700px' }}>
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
        <TextField
          margin="normal"
          required fullWidth
          id="password"
          label="Contraseña"
          type="password"
          name="password"
        />
        <TextField
          margin="normal"
          required fullWidth
          id="password"
          label="Contraseña"
          type="password"
          name="password"
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
          Register
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="login" variant="body2">Already have an account?</Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </AuthLayout>
  );
};
