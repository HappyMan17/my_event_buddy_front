import { MenuItem, TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { useState, type ChangeEvent } from 'react';

export const AddEventForm = () => {
  const currencies = ['Viaje Familiar', 'Viaje En Pareja', 'Reunion De Amigos'];

  const [selectedCurrency, setSelectedCurrency] = useState('');

  const handleCurrencyChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(event.target.value as string);
  };

  return (
    <FormLayout props={{ title: 'Add Event', buttonText: 'Create Event' }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="eventName"
            label="Name"
            type="text"
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="eventDescription"
            label="Description"
            type="text"
        />
        <TextField
            margin="normal"
            select
            fullWidth
            id="travelType"
            label="Travel Type"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            helperText="Please select your currency"
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
            label="Add Contact"
            autoComplete="email"
            autoFocus
        />
    </FormLayout>
  );
};
