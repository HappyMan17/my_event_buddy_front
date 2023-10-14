import { Route, Routes } from 'react-router-dom';
import { Login, Register } from '../pages/';
import { Home } from '../../app/pages';

export const AuthRouter = () => {
  return (
    <Routes>
        {/* Login y Registro */}
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Register /> } />
        <Route path="home" element={ <Home /> } />

        {/* Defult page */}
        <Route path="/*" element={ <Home /> } />

    </Routes>
  )
}
