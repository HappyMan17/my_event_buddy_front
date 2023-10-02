import React from 'react'
import { Box, Grid, TextField, Button, Link } from '@mui/material'
import { AuthLayout } from './layout';
import { Copyright } from '../../components';
import { createUser, type User } from '../../helpers'

export const Register = () => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newUser: User = {
      email: data.get('email')?.toString() ?? '',
      password: data.get('password')?.toString() ?? '',
      user_name: data.get('userName')?.toString() ?? '',
      nick_name: data.get('nickName')?.toString() ?? '',
      profile_image: ''
    }
    const response = await createUser(newUser)

    // const response = await getAllUsers()
    console.log({ response, ms: 'user created' });
  };

  return (
    <AuthLayout props={{ title: 'Register', minHeight: '620px' }}>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required fullWidth
          id="userName"
          label="Nombre de usuario"
          type="text"
          name="userName"
        />
        <TextField
          margin="normal"
          required fullWidth
          id="nickName"
          label="Nick Name"
          type="text"
          name="nickName"
        />
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
