import { type ReactNode, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { type User, checkIfTokenExist } from '../helpers';

interface UserContextProviderProps {
  children: ReactNode
}

export interface UserStateProps {
  user: User | null
  isUserLogin: boolean
  loginUser: () => void
  setUser: (user: User) => void
}

const saveInLocal = <T, > (key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify({ ...value }))
}

const getFromLocal = (key: string) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [userState, setUserState] = useState<UserStateProps>({
    user: null,
    isUserLogin: false,
    loginUser: () => null,
    setUser: () => null
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
      loginUser: login,
      user: getFromLocal('user'),
      setUser
    }))
  }, [])

  const login = () => {
    setUserState(prevState => ({
      ...prevState,
      isUserLogin: true
    }))
  }

  const setUser = (user: User) => {
    saveInLocal<User>('user', user)
    setUserState(prevState => ({
      ...prevState,
      user
    }))
  }

  return (
    <UserContext.Provider value={userState} >
      {children}
    </UserContext.Provider>
  );
};
