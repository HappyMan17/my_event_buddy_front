import { Alert, MenuItem, TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { useState, type ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { type AppDispatch, type RootState, updateEvent } from '../../redux';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type AlertObject } from '../types';
import { type Event } from '../../models';

export interface UpdateInputs {
  eventName: string
  eventDescription: string
  eventType: string
}

const ModifyEventForm = () => {
  const { errorMessage, isLoading, events } = useSelector((state: RootState) => state.event)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventsList, setEventsList] = useState<Event[]>([]);

  const onSelectEvent = (event: Event | null) => {
    setSelectedEvent(event);

    if (event) {
      setValue('eventName', event.event_name);
      setValue('eventDescription', event.description);
      setValue('eventType', event.type);
    } else {
      setValue('eventName', '');
      setValue('eventDescription', '');
      setValue('eventType', '');
    }
  };

  const location = useLocation();

  const { t } = useTranslation();

  const currencies = [t('family_travel'), t('couples_travel'), t('friends_reunion')];

  const [selectedCurrency, setSelectedCurrency] = useState('');

  const {
    // register,
    handleSubmit,
    // formState: { errors }
    setValue
  } = useForm<UpdateInputs>()
  const [alertState, setAlertState] = useState<AlertObject | null>(null);

  useEffect(() => {
    if (errorMessage) {
      setAlertState(errorMessage)
    }
    if (errorMessage?.alertType === 'success') {
      navigate('/')
    }
  }, [errorMessage])

  const onSubmit: SubmitHandler<UpdateInputs> = async (data) => {
    const event: Event = location.state
    // console.log({ data, event })
    const update: Event = {
      ...event,
      event_name: data.eventName,
      description: data.eventDescription,
      type: data.eventType
    }
    void dispatch(updateEvent(update))
  }

  const handleCurrencyChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(event.target.value as string);
  };

  return (
    <FormLayout props={{ title: (t('modify_event')), buttonText: (t('button_save')), handleSubmit: handleSubmit(onSubmit), isLoading }}>
        <TextField
        margin="normal"
        select
        fullWidth
        id="selectEvent"
        label="Select Event"
        onChange={(e) => {
          const selectedEventId = e.target.value
          const selected = events.find((event) => events.event_id === selectedEventId)
          onSelectEvent(selected ?? null)
        }}
      >
        {eventsList.map((event) => (
          <MenuItem key={event.event_id} value={event.event_id}>
            {event.event_name}
          </MenuItem>
        ))}
      </TextField>
        <TextField
            margin="normal"
            required
            fullWidth
            id="eventName"
            label={t('name')}
            type="text"
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="eventDescription"
            label={t('event_description')}
            type="text"
        />
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
            margin="normal"
            required
            fullWidth
            id="addContact"
            label={t('add_contact')}
            autoComplete="email"
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="deleteContact"
            label={t('delete_contact')}
            autoComplete="email"
            autoFocus
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
