import { useState, useEffect } from 'react';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { type AppDispatch, type RootState, createNewActivity } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type AlertObject } from '../types';
import { type Activity, type Event } from '../../models';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export interface ActivityInputs {
  event_id: string
  description: string
  total_activity_value: number
  is_by_percentage: boolean
}

const AddActivityForm = () => {
  const { errorMessage, isLoading } = useSelector((state: RootState) => state.activities)
  const dispatch = useDispatch<AppDispatch>()
  const [isByPersentage, setIsByPersentage] = useState<boolean>(true)

  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
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
    if (!location.state) {
      navigate('/')
    }
  }, [])

  const onSubmit: SubmitHandler<ActivityInputs> = async (data) => {
    const event: Event = location.state
    // console.log({ data, event })
    const newActivity: Activity = {
      event_id: event?.event_id ?? '',
      description: data.description,
      total_activity_value: data.total_activity_value,
      is_by_percentage: !!isByPersentage
    }
    void dispatch(createNewActivity(newActivity))
  }

  const handleButtonClick = (selection: boolean) => {
    setIsByPersentage(selection)
  }

  return (
    <FormLayout props={{ title: (t('add_activity')), buttonText: (t('button_add_activity')), handleSubmit: handleSubmit(onSubmit), isLoading }}>
      <TextField
        disabled
        margin="normal"
        fullWidth
        id="eventDescription"
        label={t('event')}
        defaultValue={location.state?.event_name ?? ''}
      />
      <TextField
        error={!!errors.description}
        margin="normal"
        required
        fullWidth
        id="description"
        label={t('activity_description')}
        type="text"
        {...register('description', { required: (t('field_required')) })}
      />
      <TextField
        error={!!errors.total_activity_value}
        margin="normal"
        required
        fullWidth
        id="total_activity_value"
        label={t('total_activity')}
        type="text"
        {...register('total_activity_value', { required: (t('field_required')) })}
      />
      <Typography
        variant="h6"
        align="center"
        sx={{ marginTop: 5 }}
      >
        {t('activity_text')}
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
          ? t('contribution_samePercentage')
          : t('contribution_askAmount')
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

export default AddActivityForm
