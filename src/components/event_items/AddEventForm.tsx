import { useState, useEffect, type ChangeEvent } from 'react';
import { Alert, MenuItem, TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { type AppDispatch, createNewEvent, type RootState } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type AlertObject } from '../types';
import { type Event } from '../../models';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { type Dayjs } from 'dayjs';

export interface EventInputs {
  eventName: string
  eventDescription: string
  eventType: string
}

const AddEventForm = () => {
  const { errorMessage, isLoading } = useSelector((state: RootState) => state.event)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EventInputs>()

  const [alertState, setAlertState] = useState<AlertObject | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [eventDate, setEventDate] = useState<Dayjs | null | string>(null);

  const { t } = useTranslation();

  const currencies = [t('family_travel'), t('couples_travel'), t('friends_reunion')];

  useEffect(() => {
    if (errorMessage) {
      setAlertState(errorMessage)
    }
    if (errorMessage?.alertType === 'success') {
      navigate('/')
    }
  }, [errorMessage])

  const handleCurrencyChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(event.target.value as string);
  };

  const onSubmit: SubmitHandler<EventInputs> = async (data: EventInputs) => {
    if (!eventDate) {
      setAlertState({ alertType: 'error', message: 'Event not created, date required' })
      return;
    }
    // console.log({ date: new Date(eventDate as string) })
    const newEvent: Event = {
      event_id: '',
      event_date: new Date(eventDate as string),
      event_name: data.eventName,
      description: data.eventDescription,
      type: selectedCurrency,
      logo: '',
      has_activity: false
    }
    const files = document.getElementById('eventImage')
    void dispatch(createNewEvent(newEvent, files))
    navigate('/')
  }

  return (
    <FormLayout props={{ title: (t('add_event')), buttonText: (t('button_add_event')), handleSubmit: handleSubmit(onSubmit), isLoading }}>
      <TextField
        error={!!errors.eventName}
        margin="normal"
        required
        fullWidth
        id="eventName"
        label={t('name')}
        type="text"
        {...register('eventName', { required: (t('field_required')) })}
      />
      <TextField
        error={!!errors.eventDescription}
        margin="normal"
        required
        fullWidth
        id="eventDescription"
        label={t('event_description')}
        type="text"
        {...register('eventDescription', { required: (t('field_required')) })}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ width: '100%' }}>
          <DatePicker
            label="Event Date"
            value={eventDate}
            sx={{ width: '100%' }}
            onChange={setEventDate}
          />
        </DemoContainer>
      </LocalizationProvider>
      <TextField
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
        id="eventImage"
        margin="normal"
        fullWidth
        type="file"
      />
      {/* <TextField
        margin="normal"
        required
        fullWidth
        id="addContact"
        label="Add Contact"
        autoComplete="email"
        autoFocus
      /> */}
      {alertState && (
        <Alert severity={alertState.alertType}>
          {alertState.message}
        </Alert>
      )}
    </FormLayout>
  );
};

export default AddEventForm;
