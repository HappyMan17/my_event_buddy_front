import { Grid, IconButton } from '@mui/material';
import {
  ModifyProfileForm,
  InactivateProfileForm,
  AddContactForm,
  DeleteContactForm,
  AddEventForm,
  ModifyEventForm,
  SideBar
} from '../../../components/';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from 'react';
import { userHomeNavItems } from '../../../components/data';
import { UserContext } from '../../../context';

export const UserHome = () => {
  const { logout } = useContext(UserContext)
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleMenuItemClick = (formName: string) => {
    setActiveForm(formName);
    handleDrawerToggle();
  };

  return (
    <Grid container wrap="nowrap" sx={{ width: '100%' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          m: 2,
          position: 'absolute',
          backgroundColor: 'white'
        }}
      >
        <MenuIcon />
      </IconButton>
      <SideBar
        navItems={userHomeNavItems}
        isMenuOpen={mobileOpen}
        toggleHandler={handleDrawerToggle}
        hasDropdown={true}
        handleMenuItemClick={handleMenuItemClick}
        props={{ hasCloseButton: true, hasLogoutButton: true, logout }}
      />
      <Grid item xs={12}>
        <Grid container sx={{
          height: '100vh',
          background: 'linear-gradient(45deg, #253469, #525D93, #111E31, #230E30)'
        }}>
          {activeForm === 'Modify Profile' && <ModifyProfileForm />}
          {activeForm === 'Inactivate Profile' && <InactivateProfileForm />}
          {activeForm === 'Add Contacts' && <AddContactForm />}
          {activeForm === 'Delete Contacts' && <DeleteContactForm />}
          {activeForm === 'Add Event' && <AddEventForm />}
          {activeForm === 'Modify Event' && <ModifyEventForm />}
        </Grid>
      </Grid>
    </Grid>
  );
};
