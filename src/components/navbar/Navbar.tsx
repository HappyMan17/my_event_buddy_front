import { type ReactNode, useState } from 'react';
import {
  IconButton,
  Toolbar,
  Button,
  AppBar,
  Box,
  CssBaseline,
  Breadcrumbs,
  Grid
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { type NavItemType } from '../types';
import { SideBar } from '..';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/user/userSlice';

interface NavbarProps {
  children: ReactNode
  props: {
    navbarItem: NavItemType[]
    sideBarItems: NavItemType[]
  }
}

export const Navbar: React.FC <NavbarProps> = ({ children, props }) => {
  const { navbarItem, sideBarItems } = props

  const dispatch = useDispatch()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleSideBarToggle = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  const componentLogout = () => {
    dispatch(logout())
  }

  return (
    <Box sx={{
      display: 'flex',
      height: '70px',
      backgroundColor: 'blue'
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
            onClick={handleSideBarToggle}
            sx={{ m: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* <img
            style={{ display: 'block', marginTop: 10 }}
            src={logoImage}
            alt='logo_image'
            width='100px'
          /> */}
          <Box sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'block'
          }}>
            <Breadcrumbs separator='/' color='#ffffff'>
              {navbarItem.map((item) => (
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
        navItems={sideBarItems}
        isMenuOpen={isSideBarOpen}
        toggleHandler={handleSideBarToggle}
        hasLogoutButton={true}
        logout={componentLogout}
      />
      <Box component="main" sx={{ p: 2, flexGrow: 1 }}>
        <Toolbar />
        {/* responsive code */}
        <Grid sx={{
          display: 'flex',
          height: 'auto'
        }} >
          {children}
        </Grid>
      </Box>
    </Box>
  );
}

export default Navbar
