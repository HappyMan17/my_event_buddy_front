import { MenuItem, TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

const ModifyEventForm = () => {
  const { t } = useTranslation();

  const currencies = [t('family_travel'), t('couples_travel'), t('friends_reunion')];

  const [selectedCurrency, setSelectedCurrency] = useState('');

  const handleCurrencyChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(event.target.value as string);
  };

  return (
    <FormLayout props={{ title: (t('modify_event')), buttonText: (t('button_save')) }}>
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
            id={t('event_description')}
            label="Description"
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
    </FormLayout>
  );
};

export default ModifyEventForm;
