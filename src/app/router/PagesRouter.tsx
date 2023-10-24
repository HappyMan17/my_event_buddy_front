import { Outlet, Route, Routes } from 'react-router-dom';
// import { UserHome } from '../pages/user_home/UserHome';
import Navbar from '../../components/navbar/Navbar';
import UserHome from '../pages/user_home/UserHome';
import { userHomeNavItems } from '../../components/data';
// import { AddContactForm, AddEventForm, DeleteContactForm, InactivateProfileForm, ModifyEventForm, ModifyProfileForm } from '../../components';
import { Suspense, lazy } from 'react';
import { Grid } from '@mui/material';

const Layout = () => {
  return (
    <>
      <Navbar props={{ navbarItem: userHomeNavItems, sideBarItems: userHomeNavItems }} >
        <Outlet />
      </Navbar>
    </>
  )
}

const ModifyProfileForm = lazy(async () => await import('../../components/event_items/ModifyEventForm'));
const InactivateProfileForm = lazy(async () => await import('../../components/event_items/AddEventForm'));
const AddContactForm = lazy(async () => await import('../../components/contacts_items/AddContactForm'));
const DeleteContactForm = lazy(async () => await import('../../components/contacts_items/DeleteContactForm'));
const AddEventForm = lazy(async () => await import('../../components/event_items/AddEventForm'));
const ModifyEventForm = lazy(async () => await import('../../components/event_items/ModifyEventForm'));

export const PagesRouter = () => {
  return (
    <Routes>
        <Route path='/' element={ <Layout /> } >
          <Route path="/" element={ <UserHome /> } />
          <Route path="modify-account" element={ <Suspense fallback={<Grid>Loading...</Grid>}><ModifyProfileForm /></Suspense> } />
          <Route path="inactivate-account" element={ <Suspense fallback={<Grid>Loading...</Grid>}><InactivateProfileForm /></Suspense> } />
          <Route path="add-contact" element={ <Suspense fallback={<Grid>Loading...</Grid>}><AddContactForm /></Suspense> } />
          <Route path="delete-contact" element={ <Suspense fallback={<Grid>Loading...</Grid>}><DeleteContactForm /></Suspense> } />
          <Route path="add-event" element={ <Suspense fallback={<Grid>Loading...</Grid>}><AddEventForm /></Suspense> } />
          <Route path="modify-event" element={ <Suspense fallback={<Grid>Loading...</Grid>}><ModifyEventForm /></Suspense> } />
          {/* Defult page */}
          <Route path="/*" element={ <UserHome /> } />
        </Route>
    </Routes>
  )
}
