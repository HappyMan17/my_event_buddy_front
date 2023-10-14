import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PagesRouter } from '../app/router/'
import { UserContext } from '../context';
import { AuthRouter } from '../auth';

interface NavigatorProps {
  isSignUp: boolean
}

const Navigator = ({ isSignUp }: NavigatorProps) => {
  return isSignUp ? <PagesRouter /> : <AuthRouter />
}

export const AppRouter = () => {
  const { isUserLogin } = useContext(UserContext);

  return (
    <Routes>

      <Route path="/*" element={ <Navigator isSignUp={ isUserLogin } /> } />

    </Routes>
  )
}
