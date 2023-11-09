import { Route, Routes } from 'react-router-dom';
import { PagesRouter } from '../app/router/'
import { useSelector } from 'react-redux';
import { type RootState } from '../redux';
import { AuthRouter } from '../auth';

interface NavigatorProps {
  isSignUp: boolean
}

const Navigator = ({ isSignUp }: NavigatorProps) => {
  return isSignUp ? <PagesRouter /> : <AuthRouter />
}

export const AppRouter = () => {
  const { isUserLogin } = useSelector((state: RootState) => state.user)

  return (
    <Routes>

      <Route path="/*" element={ <Navigator isSignUp={ true } /> } />

    </Routes>
  )
}
