import { TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { useTranslation } from 'react-i18next';

const AddContactForm = () => {
  const { t } = useTranslation();

  return (
    <FormLayout props={{ title: (t('add_contact')), buttonText: (t('add_contact')) }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('email')}
            autoComplete="email"
            autoFocus
        />
    </FormLayout>
  );
};

export default AddContactForm;
