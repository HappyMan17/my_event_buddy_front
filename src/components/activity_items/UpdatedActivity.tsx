import { useState, useEffect } from 'react';
import { Alert, TextField, Autocomplete, MenuItem, Typography } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { type AppDispatch, type RootState, updateActivity } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type AlertObject } from '../types';
import { type Event, type ActivityUpdate, type Activity } from '../../models';
import { useLocation, useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';

export interface DropDownValue {
  label: string
  value: string
}

export interface ActivityInputs {
  activity_id: string // Pa identificar la actividad
  event_id: string
  description: string
  total_activity_value: number
  is_by_percentage: boolean // lo podríamos quitar
}

const UpdatedActivity = () => {
  const { errorMessage, isLoading } = useSelector((state: RootState) => state.activities)
  const { userContacts } = useSelector((state: RootState) => state.contacts)
  const { events } = useSelector((state: RootState) => state.event)
  const [currentEvent, setCurrentEvent] = useState<null | Event>(null)
  const [currentActivity, setCurrentActivity] = useState<null | Activity>(null)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedOption, setSelectedOption] = useState<DropDownValue | null>(null);

  const location = useLocation();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ActivityInputs>()
  const [alertState, setAlertState] = useState<AlertObject | null>(null);

  useEffect(() => {
    if (errorMessage) {
      setAlertState(errorMessage)
    }
    if (errorMessage?.alertType === 'success') {
      navigate('/activity-info', { state: currentActivity })
    }
  }, [errorMessage])

  useEffect(() => {
    if (location.state) {
      const activityToUpdate: ActivityUpdate = location.state;
      setValue('description', activityToUpdate.description);
      setValue('total_activity_value', activityToUpdate.total_activity_value);
      // find current event
      const event = events.find(event => event.event_id === activityToUpdate.event_id);
      // set current event
      event && setCurrentEvent(event)
    } else {
      navigate('/')
    }
  }, []);

  const onSubmit: SubmitHandler<ActivityInputs> = async (data) => {
    const activity: ActivityUpdate = location.state

    const updatedActivity: ActivityUpdate = {
      ...activity,
      description: data.description,
      total_activity_value: data.total_activity_value,
      has_been_done: false
    }
    setCurrentActivity(updatedActivity);
    // Envia la acción de actualización de actividad
    void dispatch(updateActivity(updatedActivity))
  }

  const handleChange = (_event: any, newValue: DropDownValue | null) => {
    setSelectedOption(newValue);
  };

  return (
    <FormLayout props={{ title: 'Modify Activity', buttonText: 'Update', handleSubmit: handleSubmit(onSubmit), isLoading }}>
      <TextField
        disabled
        margin="normal"
        fullWidth
        id="eventDescription"
        label="Event"
        value={currentEvent?.event_name ?? ''}
      />
      <TextField
        error={!!errors.description}
        margin="normal"
        required
        fullWidth
        id="description"
        label="description"
        type="text"
        {...register('description', { required: 'Field required.' })}
      />
      <TextField
        error={!!errors.total_activity_value}
        margin="normal"
        required
        fullWidth
        id="total_activity_value"
        label="total_activity_value"
        type="text"
        {...register('total_activity_value', { required: 'Field required.' })}
      />
      <Autocomplete
        style={{ width: '100%', marginTop: '20px' }}
        value={selectedOption}
        onChange={handleChange}
        options={userContacts.map((contact) => ({ label: contact.contactNickname!, value: contact.relationId }))}
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

export default UpdatedActivity;
