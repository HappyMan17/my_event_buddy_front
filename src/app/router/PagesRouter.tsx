import { Outlet, Route, Routes } from 'react-router-dom';
// import { UserHome } from '../pages/user_home/UserHome';
import Navbar from '../../components/navbar/Navbar';
import UserHome from '../pages/user_home/UserHome';
import { userHomeNavItems } from '../../components/data';
import { AddContactForm, AddEventForm, DeleteContactForm, InactivateProfileForm, ModifyEventForm, ModifyProfileForm } from '../../components';

const Layout = () => {
  return (
    <>
      <Navbar props={{ navbarItem: userHomeNavItems, sideBarItems: userHomeNavItems }} >
        <Outlet />
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
        <Route path="/*" element={ <UserHome /> } />
      </Route>
    </Routes>
  )
}
