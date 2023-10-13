import { Route, Routes } from 'react-router-dom';
import { Login, Register } from '../pages/';

export const AuthRouter = () => {
  return (
    <Routes>
        {/* Login y Registro */}
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Register /> } />

        {/* Defult page */}
        <Route path="/*" element={ <Login /> } />

    </Routes>
  )
}
