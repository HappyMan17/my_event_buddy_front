import { Grid, Button, Menu, MenuItem } from '@mui/material';
import React, { MouseEvent, useState } from 'react';

//Caso base: Solo me permite visualizar el ModifyProfileForm
// interface DropdownMenuProps {
//     props: {
//         title: string;
//         buttonList: string[];
//     };
//     onModifyProfileClick: () => void;
// }

interface DropdownMenuProps {
    props: {
        title: string;
        buttonList: string[];
    }
    onItemClick: (formName: string) => void;
}

//Caso base: export const DropdownMenu: React.FC<DropdownMenuProps> = ({ props, onModifyProfileClick }) => {
export const DropdownMenu: React.FC<DropdownMenuProps> = ({ props, onItemClick }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { title, buttonList } = props;
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //Caso base: Solo me permite visualizar el ModifyProfileForm
    // const handleMenuItemClick = (item: string) => {
    //     if (item === 'Modify Profile') {
    //         onModifyProfileClick(); // Llama a la función cuando se hace clic en "Modify Profile"
    //     }
    // };


    const handleMenuItemClick = (item: string) => {
        onItemClick(item); // Llama a la función con el nombre del formulario
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
                {title}
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
                {buttonList.map(item => (
                    <MenuItem onClick={() => handleMenuItemClick(item)} key={item}>
                        {item}
                    </MenuItem>
                ))}

            </Menu>
        </Grid>
    );
};

