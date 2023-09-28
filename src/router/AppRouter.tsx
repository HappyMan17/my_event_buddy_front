import { Route, Routes } from 'react-router-dom';
import { AuthRouter } from '../auth/routes/AuthRouter';

export const AppRouter = () => {
  return (
    <Routes>

        {/* Login y Registro */}
        <Route path="/auth/*" element={ <AuthRouter /> } />

        {/* Default page */}
        {/* <Route path="/*" element={ </> } /> */}

    </Routes>
  )
}
