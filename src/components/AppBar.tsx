import * as React from 'react';
import {
  IconButton,
  Toolbar,
  Typography,
  Button,
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Breadcrumbs
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoImage from '../assets/images/logoHomeWhite.png'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

const drawerWidth = 240;
const navItems = ['About', 'Sign in', 'Register'];
const links = ['', 'login', 'register'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Drawer for top bar
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        EventBuddy
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item} disablePadding>
            <ListItemButton href={links[index]} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
            style={{ display: 'block' }}
            src={logoImage}
            alt='logo_image'
            width='13%'
          />
          <Box sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'block'
          }}>
            <Breadcrumbs separator='/' color='#ffffff'>
              {navItems.map((item, index) => (
                <Button key={item} href={links[index]} sx={{ color: '#fff' }}>
                    {item}
                </Button>
              )) }
            </Breadcrumbs>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
