import { useState } from 'react';
import { Box, Grid, TextField, Button, Link, Alert } from '@mui/material'
import { AuthLayout } from './layout';
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Copyright, LanguageSelector } from '../../components';
import { loginUser, saveToken } from '../../api';
import { useDispatch } from 'react-redux'
import { login, setUser } from '../../redux/slice/user/userSlice';
import { useTranslation } from 'react-i18next';

interface Inputs {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const dispatch = useDispatch()


  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { t } = useTranslation();
  const [isButtonDisabled, setButtonDisabled] = useState(false);


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setButtonDisabled(true);
    const user = {
      email: data.email,
      password: data.password
    }
    const response = await loginUser(user)
    if (!response?.token) {

      setAlertMessage(t('login_error'));

      return;
    } else {
      // console.log({ user, ms: 'login' });
      dispatch(setUser(response.user))
      setAlertMessage(t('login'));
    }
    dispatch(login())
    saveToken(response.token)
  };

  return (

    <AuthLayout props={{ title: (t('login')), minHeight: '500px' }} >

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <LanguageSelector/>
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          required fullWidth
          id="email"
          label={t('email')}
          autoComplete="email"
          autoFocus
          {...register('email', { required: (t('field_required')) })}
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
          required fullWidth
          id="password"
          label={t('password')}
          type="password"
          {...register('password', {
            required: (t('field_required')),
            minLength: {
              value: 8,
              message: (t('password_error'))
            }
          })}
        />
        <Button
          type="submit"
          fullWidth variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isButtonDisabled}
        >
          {t('button_login')}
        </Button>
        {alertMessage && (
          <Alert severity='error'>
            {alertMessage}
          </Alert>
        )}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">{t('forgot_password')}</Link>
          </Grid>
          <Grid item xs>
            <Link href="register" variant="body2">{t('without_account')}</Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </AuthLayout>
  );
};

export default Login;
