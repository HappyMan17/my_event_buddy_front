import { Box, Grid, TextField, Button, Link, Alert } from '@mui/material'
import { AuthLayout } from './layout';
import { Copyright } from '../../components';
import { createUser, type User } from '../../helpers'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useState } from 'react';

interface Inputs {
  userName: string
  nickName: string
  email: string
  password: string
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const [alertMessage, setAlertMessage] = useState<string | null>(null); //
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newUser: User = {
      email: data.email,
      password: data.password,
      user_name: data.userName,
      nick_name: data.nickName,
      profile_image: ''
    }
    const response = await createUser(newUser)
    if (!response) {
      setAlertMessage('No se pudo crear el usuario. Por favor, inténtalo nuevamente.');
    } else {
      setAlertMessage('Usuario creado con éxito.');
    }
  }

  return (
    <AuthLayout props={{ title: 'Register', minHeight: '620px' }}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <TextField
          error={!!errors.userName}
          helperText={errors.userName?.message}
          margin="normal"
          required fullWidth
          id="userName"
          label="Nombre de usuario"
          type="text"
          {...register('userName', { required: 'Field required.' })}
        />
        <TextField
          error={!!errors.nickName}
          helperText={errors.nickName?.message}
          margin="normal"
          required fullWidth
          id="nickName"
          label="Nick Name"
          type="text"
          {...register('nickName', { required: 'Field required.' })}
        />
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
          label="Contraseña"
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
          Register
        </Button>
        {alertMessage && (
          <Alert severity='error'>
            {alertMessage}
          </Alert>
        )}
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
