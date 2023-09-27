import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';

export const AuthRouter = () => {
  return (
    <Routes>

        {/* Login y Registro */}
        <Route path="login" element={ <Login /> } />

        {/* Defult page */}
        {/* <Route path="/*" element={ < /> } /> */}

    </Routes>
  )
}