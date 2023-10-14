import { TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'

export const AddContactForm = () => {
  return (
    <FormLayout props={{ title: 'Add contact', buttonText: 'Add contact' }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
        />
    </FormLayout>
  );
};
