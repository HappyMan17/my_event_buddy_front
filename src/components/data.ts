import { type NavItemType } from './types';

export const userHomeSideBarItems: NavItemType[] = [
  {
    buttonName: 'Profile',
    dropdownButtonsName: [
      { buttonName: 'Modify Profile', pageLink: 'modify-account' },
      { buttonName: 'Inactivate Profile', pageLink: 'inactivate-account' }
    ],
    pageLink: ''
  },
  {
    buttonName: 'Contacts',
    dropdownButtonsName: [
      { buttonName: 'Add Contacts', pageLink: 'add-contact' },
      { buttonName: 'Delete Contacts', pageLink: 'delete-contact' }
    ],
    pageLink: ''
  },
  {
    buttonName: 'Events',
    dropdownButtonsName: [
      { buttonName: 'Add Event', pageLink: 'add-event' },
      { buttonName: 'Modify Event', pageLink: 'modify-event' }
    ],
    pageLink: ''
  }
]

export const userHomeNavItems: NavItemType[] = [
  {
    buttonName: 'Home',
    pageLink: '/'
  }
]
