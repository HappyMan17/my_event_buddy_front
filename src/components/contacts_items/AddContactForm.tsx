import { type FormEvent, useEffect } from 'react'
import { Box, Button, Grid, TextField, Typography, Alert, Checkbox } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch, getAUserByEmail, AddUserContact } from '../../redux';
import { type AlertObject } from '../types';
import { UserProfileImage } from '..';

const AddContactForm = () => {
  const { errorMessage, contactSelected, userContacts } = useSelector((state: RootState) => state.contacts)
  const dispatch = useDispatch<AppDispatch>()

  const [alertState, setAlertState] = useState<AlertObject | null>(null);
  const [isChecked, setIsChecked] = useState(false)
  // const [isDisable, setIsDisable] = useState(true)
  const { t } = useTranslation();

  // useEffect(() => {
  //   void dispatch(getUserContacts())
  // }, [])

  useEffect(() => {
    if (errorMessage) {
      setAlertState(errorMessage)
    }
    // if (errorMessage?.alertType === 'success') {
    //   navigate('/')
    // }
  }, [errorMessage])

  const checkIsAlreadyFriend = (contactId: string | undefined) => {
    const contactsIds = userContacts.map(contact => contact.contactId)
    if (!contactId) {
      return
    }
    if (contactsIds.includes(contactId)) {
      return true
    }
    return false
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // type management
    const target = e.target as typeof e.target & {
      email: { value: string }
    };
    void dispatch(getAUserByEmail(target.email.value))
  }

  const addContact = () => {
    if (!contactSelected?.user_id) {
      return
    }
    void dispatch(AddUserContact(contactSelected?.user_id))
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

        <Typography component="h1" variant="h4"> Add Contact </Typography>

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

        {contactSelected && (
          <Box
            sx={{
              bgcolor: 'white',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderStyle: 'solid',
              borderWidth: 0.5,
              borderColor: 'gray',
              padding: 2,
              width: '100%',
              borderRadius: 3,
              marginBlock: 5
            }}
          >
            {!checkIsAlreadyFriend(contactSelected.user_id)
              ? (
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    sx={{ mr: 2 }}
                  />
                )
              : (
                  <Typography component="h1" variant="h5" sx={{ marginInline: 3 }}> Added </Typography>
                )
            }
            <UserProfileImage userImage={contactSelected.profile_image} />
            <Typography component="h1" variant="h5" sx={{ marginInline: 3 }}> { contactSelected.nick_name } </Typography>
          </Box>
        )}

        {alertState && (
          <Alert severity={alertState.alertType}>
            {alertState.message}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!isChecked}
          onClick={addContact}
        >
          Add contact
        </Button>
      </Box>
    </Grid>
  );
};

export default AddContactForm;
