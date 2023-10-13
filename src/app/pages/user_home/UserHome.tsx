import { Grid, Link } from '@mui/material';
import {
  DropdownMenu,
  ModifyProfileForm,
  InactivateProfileForm,
  AddContactForm,
  DeleteContactForm,
  AddEventForm,
  ModifyEventForm
} from '../../../components/';
import { useState } from 'react';

export const UserHome = () => {
  // Caso base: Solo me permite visualizar el ModifyProfileForm
  // const [showProfileForm, setShowProfileForm] = useState(false);

  // const handleModifyProfileClick = () => {
  //   setShowProfileForm(true);
  // };

  const [activeForm, setActiveForm] = useState<string | null>(null);

  const handleMenuItemClick = (formName: string) => {
    setActiveForm(formName);
  };

  return (
    <Grid container wrap="nowrap">
      <Grid item xs={4} sx={{ overflowY: 'auto' }}>
        <Grid container sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}>

          <Grid item>
            <Link href="home">
              <img
                // src='src\assets\logoUser.png'
                src='src/assets/logoUser.png'
                alt="EventBuddy"
                style={{ width: '100px', height: '100px' }}
              />
            </Link>
          </Grid>

          <Grid>
            <DropdownMenu
              props={{
                title: 'Profile',
                buttonList: ['Modify Profile', 'Inactivate Profile']
              }}
              onItemClick={handleMenuItemClick}
            />
          </Grid>

          <Grid>
            <DropdownMenu
              props={{
                title: 'Contacts',
                buttonList: ['Add Contacts', 'Delete Contacts']
              }}
              onItemClick={handleMenuItemClick}
            />
          </Grid>

          <Grid>
            <DropdownMenu
              props={{
                title: 'Events',
                buttonList: ['Add Event', 'Modify Event']
              }}
              onItemClick={handleMenuItemClick}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={8}>
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
