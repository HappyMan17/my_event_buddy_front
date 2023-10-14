import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../app/pages';
import { PagesRouter } from '../app/router/'
import { UserContext } from '../context';

interface NavigatorProps {
  isSignUp: boolean
}

const Navigator = ({ isSignUp }: NavigatorProps) => {
  return isSignUp ? <PagesRouter /> : <Home />
}

export const AppRouter = () => {
  const { isUserLogin } = useContext(UserContext);

  return (
    <Routes>

      <Route path="/*" element={ <Navigator isSignUp={ isUserLogin } /> } />

    </Routes>
  )
}
