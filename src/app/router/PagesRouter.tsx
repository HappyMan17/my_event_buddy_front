import { Route, Routes } from 'react-router-dom';
import { HomeUser } from '../../auth';

export const AuthRouter = () => {
  return (
    <Routes>

        <Route path="homeUser" element={ <HomeUser /> } />

        {/* Defult page */}
        <Route path="/*" element={ <HomeUser /> } />

    </Routes>
  )
}
