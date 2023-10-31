import { useState, useEffect, type ChangeEvent } from 'react';
import { Alert, MenuItem, TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { type AppDispatch, createNewEvent, type RootState } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type AlertObject } from '../types';
import { type Event } from '../../models';

export interface EventInputs {
  eventName: string
  eventDescription: string
  eventType: string
}

const AddEventForm = () => {
  const { event, errorMessage } = useSelector((state: RootState) => state.event)
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EventInputs>()
  const [alertState, setAlertState] = useState<AlertObject | null>(null);

  const currencies = ['Viaje Familiar', 'Viaje En Pareja', 'Reunion De Amigos'];

  const [selectedCurrency, setSelectedCurrency] = useState('');

  useEffect(() => {
    if (errorMessage) {
      setAlertState(errorMessage)
    }
  }, [errorMessage])

  const handleCurrencyChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(event.target.value as string);
  };

  const onSubmit: SubmitHandler<EventInputs> = async (data) => {
    console.log({ data })
    const newEvent: Event = {
      event_id: event?.event_id ?? '',
      event_name: data.eventName,
      description: data.eventDescription,
      type: selectedCurrency,
      logo: '',
      has_activity: false
    }
    const files = document.getElementById('eventImage')
    void dispatch(createNewEvent(newEvent, files))
  }

  return (
    <FormLayout props={{ title: 'Add Event', buttonText: 'Create Event', handleSubmit: handleSubmit(onSubmit) }}>
      <TextField
        error={!!errors.eventName}
        margin="normal"
        required
        fullWidth
        id="eventName"
        label="Name"
        type="text"
        {...register('eventName', { required: 'Field required.' })}
      />
      <TextField
        error={!!errors.eventDescription}
        margin="normal"
        required
        fullWidth
        id="eventDescription"
        label="Description"
        type="text"
        {...register('eventDescription', { required: 'Field required.' })}
      />
      <TextField
        margin="normal"
        select
        fullWidth
        id="eventType"
        label="Event Type"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        helperText="Please select your type"
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
