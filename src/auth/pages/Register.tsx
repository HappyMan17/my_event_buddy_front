import { Box, Grid, TextField, Button, Link, Alert } from '@mui/material'
import { AuthLayout } from './layout';
import { Copyright, LanguageSelector } from '../../components';
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { type Inputs, type User } from '../../models';
import { createUser } from '../../api';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const [alertMessage, setAlertMessage] = useState<string | null>(null); //

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { t } = useTranslation();


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setButtonDisabled(true);
    const newUser: User = {
      email: data.email,
      password: data.password,
      user_name: data.userName,
      nick_name: data.nickName,
      profile_image: ''
    }
    const response = await createUser(newUser)
    if (!response) {

      setAlertMessage(t('register_error'));
      setButtonDisabled(false);
      
    } else {
      setAlertMessage(t('register_successfully'));
      navigate('/login')
    }
  }

  return (
    <AuthLayout props={{ title: (t('register')), minHeight: '620px' }}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <LanguageSelector/>
        <TextField
          error={!!errors.userName}
          helperText={errors.userName?.message}
          margin="normal"
          required fullWidth
          id="userName"
          label={t('name')}
          type="text"
          {...register('userName', { required: (t('field_required')) })}
        />
        <TextField
          error={!!errors.nickName}
          helperText={errors.nickName?.message}
          margin="normal"
          required fullWidth
          id="nickName"
          label={t('nick_name')}
          type="text"
          {...register('nickName', { required: (t('field_required')) })}
        />
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
          disabled={isButtonDisabled}
          type="submit"
          fullWidth variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t('button_register')}
        </Button>
        {alertMessage && (
          <Alert severity='error'>
            {alertMessage}
          </Alert>
        )}
        <Grid container>
          <Grid item xs>
            <Link href="login" variant="body2">{t('with_account')}</Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </AuthLayout>
  );
};

export default Register;
