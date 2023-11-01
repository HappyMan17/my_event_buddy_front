import { useState, type ChangeEvent } from 'react';
import { FormControlLabel, Checkbox, TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { useTranslation } from 'react-i18next';

const InactivateProfileForm = () => {
  const [checked, setChecked] = useState(false);

  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormLayout props={{ title: (t('inactivate_account')), buttonText: (t('button_inactivate'))}}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('email')}
            autoComplete="email"
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label={t('password')}
            type="password"
        />
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label={t('checkbox_inactivate_account')}
        />
    </FormLayout>
  );
};

export default InactivateProfileForm;
