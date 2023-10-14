import { TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'

export const ModifyProfileForm = () => {
  return (
    <FormLayout props={{ title: 'Modify Profile', buttonText: 'Save Changes' }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Name"
            type="text"
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="nickName"
            label="Nick Name"
            type="text"
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
        />
    </FormLayout>
  );
};
