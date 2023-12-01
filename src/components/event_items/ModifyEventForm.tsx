import { Alert, Autocomplete, MenuItem, TextField, Typography } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { useState, type ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { type AppDispatch, type RootState, updateEvent, addEventContact } from '../../redux';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type AlertObject } from '../types';
import { type Event } from '../../models';
import SearchIcon from '@mui/icons-material/Search';

export interface DropDownValue {
  label: string
  value: string
}

export interface UpdateInputs {
  eventName: string
  eventDescription: string
  eventType: string
}

const ModifyEventForm = () => {
  const { errorMessage, isLoading } = useSelector((state: RootState) => state.event)
  const { userContacts } = useSelector((state: RootState) => state.contacts)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation();
  const navigate = useNavigate()
  const { t } = useTranslation();
  const [alertState, setAlertState] = useState<AlertObject | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedOption, setSelectedOption] = useState<DropDownValue | null>(null);

  useEffect(() => {
    if (!location.state) {
      navigate('/')
      return
    }
    setEvent(location.state)
    setSelectedCurrency(location.state.type)
  }, [])

  useEffect(() => {
    if (errorMessage) {
      setAlertState(errorMessage)
    }
    if (errorMessage?.alertType === 'success') {
      navigate('/')
    }
  }, [errorMessage])

  const currencies = [t('family_travel'), t('couples_travel'), t('friends_reunion')];

  const {
    register: update,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateInputs>({
    defaultValues: {
      eventDescription: location.state.description,
      eventName: location.state.event_name,
      eventType: location.state.type
    }
  })

  const handleChange = (_event: any, newValue: DropDownValue | null) => {
    setSelectedOption(newValue);
  };

  const onSubmit: SubmitHandler<UpdateInputs> = async (data) => {
    const updatedEvent: Event = {
      ...event!,
      event_name: data.eventName,
      description: data.eventDescription,
      type: selectedCurrency,
      has_activity: false,
      has_been_done: false
    }
    void dispatch(updateEvent(updatedEvent))
    if (selectedOption && event) {
      void dispatch(addEventContact({
        contactId: selectedOption.value,
        event_id: event.event_id!
      }))
    }
  }

  const handleCurrencyChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(event.target.value as string);
  };

  return (
    <FormLayout props={{ title: (t('modify_event')), buttonText: (t('button_save')), handleSubmit: handleSubmit(onSubmit), isLoading }}>
      <TextField
        error={!!errors.eventName}
        margin="normal"
        required
        fullWidth
        id="eventName"
        label={t('name')}
        type="text"
        autoFocus
        {...update('eventName', { required: (t('field_required')) })}
      />
      <TextField
        error={!!errors.eventDescription}
        margin="normal"
        required
        fullWidth
        id="eventDescription"
        label={t('event_description')}
        type="text"
        {...update('eventDescription', { required: (t('field_required')) })}
      />
      <TextField
        error={!!errors.eventType}
        margin="normal"
        select
        fullWidth
        id="eventType"
        label={t('event_type')}
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        helperText={t('helper_textevent_type')}
      >
        {currencies.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        margin="normal"
        // required
        fullWidth
        id="addContact"
        label={t('add_contact')}
        autoComplete="email"
      />
      <TextField
        margin="normal"
        // required
        fullWidth
        id="deleteContact"
        label={t('delete_contact')}
        autoComplete="email"
      />
      <Autocomplete
        style={{ width: '100%', marginTop: '20px' }}
        value={selectedOption}
        onChange={handleChange}
        options={userContacts.map((contact) => ({ label: contact.contactNickname!, value: contact.contactId }))}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <MenuItem {...props}>
            {option.label}
          </MenuItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a friend"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <SearchIcon />
                  {params.InputProps.startAdornment}
                </>
              )
            }}
          />
        )}
        noOptionsText={<Typography>No options</Typography>}
      />
      {alertState && (
        <Alert severity={alertState.alertType}>
          {alertState.message}
        </Alert>
      )}
    </FormLayout>
  );
};

export default ModifyEventForm;
