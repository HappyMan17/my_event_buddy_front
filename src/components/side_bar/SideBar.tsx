import { Box } from '@mui/system'
import { Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { type NavItemType } from '../types'
import CancelIcon from '@mui/icons-material/Cancel';
import { useState, type MouseEvent } from 'react'
import { MenuComponent } from '../menu_component/MenuComponent'

interface SideBarProps {
  navItems: NavItemType[]
  toggleHandler: () => void
  isMenuOpen: boolean
  hasDropdown?: boolean
  props?: {
    drawerWidth?: number
    window?: () => Window
    display?: { xs: string, sm: string } | string
    hasCloseButton?: boolean
    hasLogoutButton?: boolean
    logout?: () => void
  }
}

const initLogout = () => null

/**
 * To show this side bar is necessary a button to toggle this menu
 * @param navItems: an object with button name and its link
 * @param toggleHandler: Function to change an isMenuOpen state
 * @param isMenuOpen: Depending on this state the side menu will be shown or not
 * @param props: aditional necessary props, this are custom depending on what we need
 * @returns void
 */

export const SideBar: React.FC<SideBarProps> = ({
  navItems,
  toggleHandler,
  isMenuOpen,
  hasDropdown = false,
  props = {}
}) => {
  const { window, drawerWidth = 240, display = 'flex', hasCloseButton = false, hasLogoutButton = false, logout = initLogout } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={isMenuOpen}
        onClose={ hasCloseButton ? () => null : toggleHandler }
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {hasCloseButton && (
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} >
            <IconButton
              color="inherit"
              edge="end"
              onClick={ toggleHandler }
              sx={{ mr: 2 }}
            >
              <CancelIcon />
            </IconButton>
          </Grid>
        )}
        <Box
          onClick={ hasCloseButton ? () => null : toggleHandler }
          sx={{ textAlign: 'center', flex: '1' }}
        >
          <Typography variant="h6" sx={{ my: 2 }}>
            Event Buddy
          </Typography>
          <Divider />
          {hasDropdown
            ? (
              <>
                <List sx={{ display: 'flex', flexDirection: 'column' }}>
                  {navItems.filter(item => item.buttonName !== 'Home').map((item) => (
                    <ListItem key={item.buttonName} disablePadding>
                      <ListItemButton
                        id={item.buttonName}
                        onClick={handleClick}
                        sx={{ textAlign: 'center' }}
                      >
                        <ListItemText primary={item.buttonName} />
                        <MenuComponent
                          anchorEl={anchorEl}
                          menuId={item.buttonName}
                          buttonNameList={item.dropdownButtonsName ?? []}
                          handleClose={handleClose}
                          toggleHandler={toggleHandler}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                {hasLogoutButton && (
                  <ListItem key={'logout'} sx={{ alignItems: 'flex-end' }} >
                    <ListItemButton
                      sx={{ textAlign: 'center' }}
                      onClick={logout}
                    >
                      <ListItemText primary={'Logout'} />
                    </ListItemButton>
                  </ListItem>
                )}
              </>
              )
            : (
              <List>
                {navItems.filter(item => item.buttonName !== 'Home').map((item) => (
                  <ListItem key={item.buttonName} disablePadding>
                    <ListItemButton href={item.pageLink} sx={{ textAlign: 'center' }}>
                      <ListItemText primary={item.buttonName} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              )
          }
        </Box>
      </Drawer>
    </nav>
  )
}
