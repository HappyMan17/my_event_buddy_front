import { type NavItemType } from './types';

export const userHomeSideBarItems: NavItemType[] = [
  {
    buttonName: 'Modify Profile',
    pageLink: 'modify-account'
  },
  {
    buttonName: 'Inactivate Profile',
    pageLink: 'inactivate-account'
  },
  {
    buttonName: 'Add Contacts',
    pageLink: 'add-contact'
  },
  {
    buttonName: 'Delete Contacts',
    pageLink: 'delete-contact'
  },
  {
    buttonName: 'Add Event',
    pageLink: 'add-event'
  }
]

export const userHomeNavItems: NavItemType[] = [
  {
    buttonName: 'Home',
    pageLink: '/'
  }
]
