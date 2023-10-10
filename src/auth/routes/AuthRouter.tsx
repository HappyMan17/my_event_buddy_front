import { Route, Routes } from 'react-router-dom';
import { Login, Register, Home } from '../pages/';

export const AuthRouter = () => {
  return (
    <Routes>

        {/* Home page */}
        <Route path="home" element={ <Home /> } />
        {/* Login y Registro */}
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Register /> } />

        {/* Defult page */}
        <Route path="/*" element={ <Login /> } />

    </Routes>
  )
}
