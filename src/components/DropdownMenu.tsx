import { Grid, Button, Menu, MenuItem } from '@mui/material';
import React, { type MouseEvent, useState } from 'react';
interface DropdownMenuProps {
  props: {
    title: string
    buttonList: string[]
  }
  onItemClick: (formName: string) => void
}

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

  const handleMenuItemClick = (item: string) => {
    onItemClick(item);
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
          'aria-labelledby': 'basic-button'
        }}
      >
        {buttonList.map(item => (
            <MenuItem onClick={() => { handleMenuItemClick(item); }} key={item}>
                {item}
            </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};
