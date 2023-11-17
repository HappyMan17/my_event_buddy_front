import { useState, useEffect } from 'react';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { type AppDispatch, type RootState, updateActivity } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type AlertObject } from '../types';
import { type ActivityUpdate, type Event } from '../../models';
import { useLocation, useNavigate } from 'react-router';

export interface ActivityInputs {
  activity_id: string // Pa identificar la actividad
  event_id: string
  description: string
  total_activity_value: number
  is_by_percentage: boolean
}

const UpdatedActivity = () => {
  const { errorMessage, isLoading } = useSelector((state: RootState) => state.activities)
  const dispatch = useDispatch<AppDispatch>()
  const [isByPersentage, setIsByPersentage] = useState<boolean>(true)

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
      navigate('/')
    }
  }, [errorMessage])

  useEffect(() => {
    if (location.state) {
      const activityToUpdate: ActivityUpdate = location.state;
      // Establece los valores iniciales del formulario con los datos de la actividad existente
      setValue('activity_id', activityToUpdate.activity_id); // Establece el ID de la actividad
      setValue('event_id', activityToUpdate.event_id);
      setValue('description', activityToUpdate.description);
      setValue('total_activity_value', activityToUpdate.total_activity_value);
      setIsByPersentage(activityToUpdate.is_by_percentage);
    } else {
      navigate('/')
    }
  }, [location.state]);

  const onSubmit: SubmitHandler<ActivityInputs> = async (data) => {
    const event: Event = location.state

    const updatedActivity: ActivityUpdate = {
      activity_id: data.activity_id,
      event_id: event?.event_id ?? '',
      description: data.description,
      total_activity_value: data.total_activity_value,
      is_by_percentage: isByPersentage,
      has_been_done: false
    }
    // Envia la acción de actualización de actividad
    void dispatch(updateActivity(updatedActivity.activity_id, updatedActivity))
  }

  const handleButtonClick = (selection: boolean) => {
    setIsByPersentage(selection)
  }

  return (
    <FormLayout props={{ title: 'Create Activity', buttonText: 'Create', handleSubmit: handleSubmit(onSubmit), isLoading }}>
      <TextField
        disabled
        margin="normal"
        fullWidth
        id="eventDescription"
        label="Event"
        defaultValue={location.state?.event_name ?? ''}
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
      <Typography
        variant="h6"
        align="center"
        sx={{ marginTop: 5 }}
      >
        Same percentage for every participant?
      </Typography>
      <Grid container sx={{ marginTop: 0.3, justifyContent: 'center' }} spacing={3}>
        <Grid item>
          <Button
            variant={isByPersentage ? 'contained' : 'outlined'}
            onClick={() => { handleButtonClick(true) }}
          >
            Si
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={isByPersentage ? 'outlined' : 'contained'}
            onClick={() => { handleButtonClick(false) }}
          >
            No
          </Button>
        </Grid>
      </Grid>
      <Typography
        variant="subtitle2"
        align="center"
        sx={{ marginBlock: 3 }}
      >
        {isByPersentage
          ? 'The same contribution percentage will be applied to each participant'
          : 'The amount to pay by participant will be asked when it is added'
        }
      </Typography>
      {alertState && (
        <Alert severity={alertState.alertType}>
          {alertState.message}
        </Alert>
      )}
    </FormLayout>
  );
};

export default UpdatedActivity;
