import { Grid, Link } from '@mui/material';
import { MenuProfile } from '../../components';
import { MenuContacts } from '../../components';
import { MenuEvents } from '../../components';

export const HomeUser = () => {


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
                src='src\assets\logoUser.png'
                alt="EventBuddy"
                style={{ width: '100px', height: '100px' }}
              />
            </Link>
          </Grid>

          <Grid>
            <MenuProfile></MenuProfile>
          </Grid>

          <Grid>
            <MenuContacts></MenuContacts>
          </Grid>

          <Grid>
            <MenuEvents></MenuEvents>
          </Grid>

        </Grid>
      </Grid>

      <Grid item xs={8}>
        <Grid container sx={{
          height: '100vh',
          background: 'linear-gradient(45deg, #253469, #525D93, #111E31, #230E30)'
        }}>
        </Grid>
      </Grid>
    </Grid>
  );
};