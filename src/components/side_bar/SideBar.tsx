import { Grid, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Divider, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { type NavItemType } from '../types';
import { useNavigate } from 'react-router-dom';
import { LanguageSelector } from '..';

interface SideBarProps {
  navItems: NavItemType[]
  toggleHandler: () => void
  isMenuOpen: boolean
  hasCloseButton?: boolean // Consider removing this prop if it's not needed
  hasLogoutButton?: boolean
  logout?: () => void
}

const initLogout = () => null;

export const SideBar: React.FC<SideBarProps> = ({
  navItems,
  toggleHandler,
  isMenuOpen,
  hasCloseButton = false,
  hasLogoutButton = false,
  logout = initLogout
}) => {
  const navigate = useNavigate();

  return (
    <nav>
      <Drawer
        variant="temporary"
        open={isMenuOpen}
        onClose={hasCloseButton ? () => null : toggleHandler}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
        }}
      >
        {hasCloseButton && (
          <IconButton color="inherit" edge="end" onClick={toggleHandler} sx={{ mr: 2 }}>
            <CancelIcon />
          </IconButton>
        )}
        <Grid sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Event Buddy
          </Typography>
          <Divider />
          <List>
            {navItems.map((item, index) => (
              <div key={item.buttonName}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => { navigate(item.pageLink); }}
                    sx={{ textAlign: 'center' }}
                  >
                    <ListItemText primary={item.buttonName} />
                  </ListItemButton>
                </ListItem>
                {index < navItems.length - 1 && <Divider />}
              </div>
            ))}
          </List>
          {hasLogoutButton && (
            <ListItem sx={{ alignItems: 'flex-end' }}>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={logout}>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </ListItem>
          )}
          <LanguageSelector/>
        </Grid>
      </Drawer>
    </nav>
  );
};
