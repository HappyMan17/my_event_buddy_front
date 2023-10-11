import { Route, Routes } from 'react-router-dom';
import { AuthRouter } from '../auth/routes/AuthRouter';
import { Home } from '../app/pages';

export const AppRouter = () => {
  return (
    <Routes>

        {/* Login y Registro */}
        <Route path="/auth/*" element={ <AuthRouter /> } />

        {/* Home */}
        <Route path="/home" element={ <Home /> } />

        {/* Default page */}
        <Route path="/*" element={ <AuthRouter/> } />

    </Routes>
  )
}
