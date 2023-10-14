import { Route, Routes } from 'react-router-dom';
import { UserHome } from '../pages/user_home/UserHome';

export const PagesRouter = () => {
  return (
    <Routes>

        <Route path="userHome" element={ <UserHome /> } />

        {/* Defult page */}
        <Route path="/*" element={ <UserHome /> } />

    </Routes>
  )
}
