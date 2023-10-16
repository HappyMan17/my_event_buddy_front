import { Box } from '@mui/system'
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { type NavItemType } from '../types'

interface SideBarProps {
  navItems: NavItemType[]
  toggleHandler: () => void
  isMenuOpen: boolean
  props?: {
    drawerWidth?: number
    window?: () => Window
    display?: { xs: string, sm: string } | string
  }
}

/**
 * To show this side bar is necessary a button to toggle this menu
 * @param navItems: an object with button name and its link
 * @param toggleHandler: Function to change an isMenuOpen state
 * @param isMenuOpen: Depending on this state the side menu will be shown or not
 * @param props: aditional necessary props, this are custom depending on what we need
 * @returns void
 */

export const SideBar: React.FC<SideBarProps> = ({ navItems, toggleHandler, isMenuOpen, props = {} }) => {
  const { window, drawerWidth = 240, display = 'flex' } = props

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={isMenuOpen}
        onClose={toggleHandler}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Box onClick={toggleHandler} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Event Buddy
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.buttonName} disablePadding>
                <ListItemButton href={item.pageLink} sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.buttonName} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  )
}
