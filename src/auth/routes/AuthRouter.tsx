import { Route, Routes } from 'react-router-dom';
// import { Login, Register } from '../pages/';
import { Home } from '../../app/pages';
import { Suspense, lazy } from 'react';
import { Grid } from '@mui/material';

const Login = lazy(async () => await import('../pages/Login'));
const Register = lazy(async() => await import('../pages/Register'));

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<Suspense fallback={<Grid>Loading...</Grid>}><Login /></Suspense>} />
      <Route path="register" element={<Suspense fallback={<Grid>Loading...</Grid>}><Register /></Suspense>} />
      <Route path="home" element={<Home />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}
