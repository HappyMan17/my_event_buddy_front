import { useEffect, useState } from 'react'
import { Menu, MenuItem } from '@mui/material';

interface MenuComponentProps {
  menuId: string
  buttonNameList: string[]
  anchorEl: null | HTMLElement
  handleClose: () => void
  handleMenuItemClick: (name: string) => void
}

export const MenuComponent: React.FC <MenuComponentProps> = ({
  menuId,
  buttonNameList,
  handleMenuItemClick,
  anchorEl,
  handleClose
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (anchorEl && anchorEl?.id === menuId) {
      setIsOpen(true)
    }
  }, [anchorEl])

  const handleIsOpen = () => {
    setIsOpen(false)
  }

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
    >
      {buttonNameList.map(item => (
        <MenuItem
          onClick={
            () => {
              handleMenuItemClick(item)
              handleIsOpen()
            }
          }
          key={item}
        >
          {item}
        </MenuItem>
      ))}
    </Menu>
  )
}
