import { type NavItemType } from './types';

export const userHomeNavItems: NavItemType[] = [
  {
    buttonName: 'Profile',
    dropdownButtonsName: [
      'Modify Profile',
      'Inactivate Profile'
    ],
    pageLink: ''
  },
  {
    buttonName: 'Contacts',
    dropdownButtonsName: [
      'Add Contacts',
      'Delete Contacts'
    ],
    pageLink: ''
  },
  {
    buttonName: 'Events',
    dropdownButtonsName: [
      'Add Event',
      'Modify Event'
    ],
    pageLink: ''
  }
]
