import { Route, Routes } from 'react-router-dom';
import { Login, Register, HomeUser } from '../pages/';

export const AuthRouter = () => {
  return (
    <Routes>
        {/* useContext to access the PagesRouter */}
        {/* {isUserLogIn && <PagesRouter />} */}
        <Route path="homeUser" element={ <HomeUser /> } />

        {/* Login y Registro */}
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Register /> } />

        {/* Defult page */}
        <Route path="/*" element={ <Login /> } />

    </Routes>
  )
}
