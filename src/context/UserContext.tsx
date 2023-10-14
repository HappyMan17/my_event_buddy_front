import { createContext } from 'react';
import { type UserStateProps } from '.';

export const UserContext = createContext<UserStateProps>({
  userId: null,
  userName: null,
  isUserLogin: false,
  loginUser: () => null
});
