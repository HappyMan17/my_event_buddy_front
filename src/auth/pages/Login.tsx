import { Box, Grid, TextField, Button, Link, Alert } from '@mui/material'
import { AuthLayout } from './layout';
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Copyright } from '../../components';
import { useState } from 'react';
import { loginUser } from '../../helpers';

interface Inputs {
  email: string
  password: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const [alertMessage, setAlertMessage] = useState<string | null>(null); //

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const user = {
      email: data.email,
      password: data.password
    }
    // console.log({ user });
    const response = await loginUser(user)
    if (!response) {
      setAlertMessage('User creation failed. Please try again.');
    } else {
      setAlertMessage('User created successfully');
    }
    // console.log({response})
  };

  return (
    <AuthLayout props={{ title: 'Login', minHeight: '500px' }} >
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          required fullWidth
          id="email"
          label="Email"
          autoComplete="email"
          autoFocus
          {...register('email', { required: 'Field required.' })}
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
          required fullWidth
          id="password"
          label="Password"
          type="password"
          {...register('password', {
            required: 'Field required',
            minLength: {
              value: 8,
              message: 'Password must have 8 characteres.'
            }
          })}
        />
        <Button
          type="submit"
          fullWidth variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          SING IN
        </Button>
        {alertMessage && (
          <Alert severity='error'>
            {alertMessage}
          </Alert>
        )}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">Forgot your password?</Link>
          </Grid>
          <Grid item xs>
            <Link href="register" variant="body2">Dont have an account? Register</Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </AuthLayout>
  );
};
