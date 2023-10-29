import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import UserHome from '../pages/user_home/UserHome';
import { userHomeNavItems } from '../../components/data';
import { Suspense, lazy } from 'react';
import { Grid } from '@mui/material';
const ModifyProfileForm = lazy(async () => await import('../../components/profile_items/ModifyProfileForm'));
const InactivateProfileForm = lazy(async () => await import('../../components/profile_items/InactivateProfileForm'));
const AddContactForm = lazy(async () => await import('../../components/contacts_items/AddContactForm'));
const DeleteContactForm = lazy(async () => await import('../../components/contacts_items/DeleteContactForm'));
const AddEventForm = lazy(async () => await import('../../components/event_items/AddEventForm'));
const ModifyEventForm = lazy(async () => await import('../../components/event_items/ModifyEventForm'));

const Layout = () => {
  return (
    <>
      <Navbar props={{ navbarItem: userHomeNavItems, sideBarItems: userHomeNavItems }} >
        <Suspense fallback={<Grid>Loading...</Grid>}>
          <Outlet />
        </Suspense>
      </Navbar>
    </>
  )
}

export const PagesRouter = () => {
  return (
    <Routes>
        <Route path='/' element={ <Layout /> } >
          <Route path="/" element={ <UserHome /> } />
          <Route path="modify-account" element={ <ModifyProfileForm /> } />
          <Route path="inactivate-account" element={ <InactivateProfileForm /> } />
          <Route path="add-contact" element={ <AddContactForm /> } />
          <Route path="delete-contact" element={ <DeleteContactForm /> } />
          <Route path="add-event" element={ <AddEventForm /> } />
          <Route path="modify-event" element={ <ModifyEventForm /> } />
          {/* Defult page */}
          <Route path="/*" element={ <Navigate to="/" replace={true} /> } />
        </Route>
    </Routes>
  )
}
