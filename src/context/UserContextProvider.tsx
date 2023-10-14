import { type ReactNode, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { checkIfTokenExist } from '../helpers';

interface UserContextProviderProps {
  children: ReactNode
}

export interface UserStateProps {
  userId: string | null
  userName: string | null
  isUserLogin: boolean
  loginUser: () => void
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [userState, setUserState] = useState<UserStateProps>({
    userId: null,
    userName: null,
    isUserLogin: false,
    loginUser: () => null
  });

  useEffect(() => {
    if (checkIfTokenExist()) {
      setUserState(prevState => ({
        ...prevState,
        isUserLogin: true
      }))
    }
    setUserState(prevState => ({
      ...prevState,
      loginUser: login
    }))
  }, [])

  const login = () => {
    setUserState(prevState => ({
      ...prevState,
      isUserLogin: true
    }))
  }

  return (
    <UserContext.Provider value={userState} >
      {children}
    </UserContext.Provider>
  );
};
