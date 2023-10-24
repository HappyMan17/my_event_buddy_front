import { createContext } from 'react';
import { type UserStateProps } from '.';

export const UserContext = createContext<UserStateProps>({
  user: null,
  isUserLogin: false,
  loginUser: () => null,
  logout: () => null,
  setUser: () => null
});
