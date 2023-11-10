import { type FormEvent, useEffect } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch, getAUserByEmail } from '../../redux';
import { type AlertObject } from '../types';

const AddContactForm = () => {
  const { errorMessage, isLoading, contactSelected } = useSelector((state: RootState) => state.contacts)
  const dispatch = useDispatch<AppDispatch>()

  const [alertState, setAlertState] = useState<AlertObject | null>(null);
  // const [isDisable, setIsDisable] = useState(true)
  const { t } = useTranslation();

  useEffect(() => {
    if (errorMessage) {
      setAlertState(errorMessage)
    }
    // if (errorMessage?.alertType === 'success') {
    //   navigate('/')
    // }
  }, [errorMessage])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // type management
    const target = e.target as typeof e.target & {
      email: { value: string }
    };
    void dispatch(getAUserByEmail(target.email.value))
  }

  return (
    <Grid container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      margin: 0
    }}>
      <Box
        component="form"
        sx={{
          mt: 1,
          bgcolor: 'white',
          margin: { sm: 3, sx: 0 },
          borderRadius: 4,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '200px',
          width: { sm: '600px', sx: '100%' }
        }}
        onSubmit={handleSubmit}
      >

        <Typography component="h1" variant="h4"> Hello </Typography>

        <Grid container sx={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: { xs: 'center', sm: 'space-between' } }}>
          <TextField
              id="email"
              name="email"
              label={t('email')}
              sx={{ width: { xs: '100%', sm: '70%' } }}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ width: { xs: '100%', sm: '90px' }, height: '52px', mt: 0.9 }}
          >
            Search
          </Button>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!contactSelected}
        >
          Add contact
        </Button>
      </Box>
    </Grid>
  );
};

export default AddContactForm;
