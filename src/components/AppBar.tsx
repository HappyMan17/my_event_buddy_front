import * as React from 'react';
import {
  IconButton,
  Toolbar,
  Button,
  AppBar,
  Box,
  CssBaseline,
  Breadcrumbs
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoImage from '../assets/images/logoHomeWhite.png'
import { SideBar } from './side_bar/SideBar';
import { type NavItemType } from './types';

const navItems: NavItemType[] = [
  {
    buttonName: 'About',
    pageLink: ''
  },
  {
    buttonName: 'Sign in',
    pageLink: 'login'
  },
  {
    buttonName: 'Register',
    pageLink: 'register'
  }
]

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{
      display: 'flex'
    }}>
      <CssBaseline />
      <AppBar elevation={0} component="nav" sx={{ bgcolor: 'transparent' }}>
        <Toolbar sx={{
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            style={{ display: 'block', marginTop: 10 }}
            src={logoImage}
            alt='logo_image'
            width='100px'
          />
          <Box sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'block'
          }}>
            <Breadcrumbs separator='/' color='#ffffff'>
              {navItems.map((item) => (
                <Button key={item.buttonName} href={item.pageLink} sx={{ color: '#fff' }}>
                    {item.buttonName}
                </Button>
              )) }
            </Breadcrumbs>
          </Box>
        </Toolbar>
      </AppBar>
      {/* SideBar component */}
      <SideBar
        navItems={navItems}
        toggleHandler={handleDrawerToggle}
        isMenuOpen={mobileOpen}
      />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
