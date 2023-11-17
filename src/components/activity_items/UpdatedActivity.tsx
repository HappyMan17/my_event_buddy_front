import { useState, useEffect } from 'react';
import { Alert, TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { type AppDispatch, type RootState, updateActivity } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type AlertObject } from '../types';
import { type Event, type ActivityUpdate, type Activity } from '../../models';
import { useLocation, useNavigate } from 'react-router';

export interface ActivityInputs {
  activity_id: string // Pa identificar la actividad
  event_id: string
  description: string
  total_activity_value: number
  is_by_percentage: boolean // lo podríamos quitar
}

const UpdatedActivity = () => {
  const { errorMessage, isLoading } = useSelector((state: RootState) => state.activities)
  const { events } = useSelector((state: RootState) => state.event)
  const [currentEvent, setCurrentEvent] = useState<null | Event>(null)
  const [currentActivity, setCurrentActivity] = useState<null | Activity>(null)
  const dispatch = useDispatch<AppDispatch>()

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
      {alertState && (
        <Alert severity={alertState.alertType}>
          {alertState.message}
        </Alert>
      )}
    </FormLayout>
  );
};

export default UpdatedActivity;
