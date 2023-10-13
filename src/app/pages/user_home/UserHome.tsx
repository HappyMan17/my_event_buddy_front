import { Grid, Link } from '@mui/material';
import { DropdownMenu, ModifyProfileForm, InactivateProfileForm} from '../../../components/';
import React, { useState } from 'react';

export const UserHome = () => {
  // const [showProfileForm, setShowProfileForm] = useState(false);

  // const handleModifyProfileClick = () => {
  //   setShowProfileForm(true);
  // };

  const [activeForm, setActiveForm] = useState<string | null>(null);

  const handleMenuItemClick = (formName: string) => {
    setActiveForm(formName);
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <Grid container sx={{
          display: 'flex',
          flexDirection: "column",
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}>
          <Grid item>
            <Link href="home">
              <img
                // src='src\assets\logoUser.png'
                src='../../../assets/logoUser.png'
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

          {/* <Grid>
            <DropdownMenu
              props={{
                title: 'Contacts',
                buttonList: ['Add Contacts', 'Delete Contacts']
              }} />
          </Grid>

          <Grid>
            <DropdownMenu
              props={{
                title: 'Events',
                buttonList: ['Add Event', 'Edit Event']
              }} />
          </Grid> */}

        </Grid>
      </Grid>

      <Grid item xs={8}>
        <Grid container sx={{
          height: '100vh',
          background: 'linear-gradient(45deg, #253469, #525D93, #111E31, #230E30)'
        }}>
          {activeForm === 'Modify Profile' && <ModifyProfileForm />}
          {activeForm === 'Inactivate Profile' && <InactivateProfileForm />}
        </Grid>
      </Grid>
    </Grid>
  );
};