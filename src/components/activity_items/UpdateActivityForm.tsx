import { Button, Divider, TextField, Typography } from '@mui/material';
import { FormLayout } from '../FormLayout';
import { useTranslation } from 'react-i18next';

const UpdateActivityForm = () => {
  const { t } = useTranslation();

  return (
    <FormLayout props={{ title: (t('update_activity')), buttonText: (t('button_save'))}}>
      <TextField
        disabled
        margin="normal"
        fullWidth
        id="eventDescription"
        label="Event"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        label={t('activity_description')}
        type="text"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="total_activity_value"
        label={t('total_activity_value')}
        type="text"
      />
      <Divider />
      <Typography
        variant="h6"
        align="center"
        sx={{ marginTop: 5 }}
      >
        {t('finish_activity_text')}
      </Typography>
      <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
      >
        {t('button_finish_activity')}
      </Button>
    </FormLayout>
  );
};

export default UpdateActivityForm
