import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { type NavItemType } from '../types';
import { useNavigate } from 'react-router-dom';

interface MenuComponentProps {
  buttonNameList: NavItemType[]
  toggleHandler?: () => void
}

export const MenuComponent: React.FC<MenuComponentProps> = ({ buttonNameList, toggleHandler = () => null }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleItemClick = (index: number, pageLink: string) => {
    setSelectedIndex(index);
    toggleHandler();
    navigate(pageLink);
  };

  return (
    <List>
      {buttonNameList.map((item, index) => (
        <div key={item.buttonName}>
          <ListItem
            button
            selected={index === selectedIndex}
            onClick={() => { handleItemClick(index, item.pageLink); }}
          >
            <ListItemText primary={item.buttonName} />
          </ListItem>
          {index < buttonNameList.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
};
