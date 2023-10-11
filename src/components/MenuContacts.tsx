import { Grid, Button, Menu, MenuItem } from '@mui/material';
import React, { MouseEvent } from 'react';

export const MenuContacts = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid item>
            <Button
                variant="contained"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ marginBottom: 2 }}
            >
                Contacts
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Add Contact</MenuItem>
                <MenuItem onClick={handleClose}>Delete Contact</MenuItem>
            </Menu>
        </Grid>
    );
};