import { useState, ChangeEvent } from 'react';
import { FormControlLabel, Checkbox, TextField } from '@mui/material'
import { FormLayout } from '../FormLayout'

export const DeleteContactForm = () => {

    const [checked, setChecked] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (

        <FormLayout props={{ title: "Delete Contact", buttonText: "Save Changes" }}>
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

            <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} />}
                label="You want to delete contact "
            />

        </FormLayout>

    );

};
