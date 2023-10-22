import { useEffect, useState } from 'react'
import { Menu, MenuItem } from '@mui/material';
import { type NavItemType } from '../types';
import { useNavigate } from 'react-router-dom';

interface MenuComponentProps {
  menuId: string
  buttonNameList: NavItemType[]
  anchorEl: null | HTMLElement
  handleClose: () => void
  toggleHandler?: () => void
}

export const MenuComponent: React.FC <MenuComponentProps> = ({
  menuId,
  buttonNameList,
  anchorEl,
  handleClose,
  toggleHandler = () => null
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (anchorEl && anchorEl?.id === menuId) {
      setIsOpen(true)
    }
  }, [anchorEl])

  const handleIsOpen = (pageLink: string) => {
    setIsOpen(false)
    toggleHandler()
    navigate(pageLink)
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
          key={item.buttonName}
          onClick={() => { handleIsOpen(item.pageLink) }}
        >
          {item.buttonName}
        </MenuItem>
      ))}
    </Menu>
  )
}
