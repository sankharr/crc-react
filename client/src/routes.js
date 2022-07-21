import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AddDevice from './pages/devices/addDevice';
import DeviceBrowser from './pages/devices/deviceBrowser';
import CreateReservation from './pages/reservations/CreateReservation';
import CurrentReservations from './pages/reservations/currentReservations';
import PastReservations from './pages/reservations/pastReservations';
import ReservationCalendar from './pages/reservations/reservationCalendar';
import Settings from './pages/settings';
//
// import Blog from './pages/Blog';
// import User from './pages/User';
// import Login from './pages/Login';
// import NotFound from './pages/Page404';
// import Register from './pages/Register';
// import Products from './pages/Products';
// import DashboardApp from './pages/DashboardApp';
// import Requests from './pages/Requests/Requests';
// import CreateRequest from './pages/Requests/CreateRequest';
// import RegisterPharmacy from './pages/Pharmacy/PharmacyRegistration/RegisterPharmacy';
// import PharmacyRequests from './pages/Pharmacy/PharmacyRequests';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'reservationCalendar', element: <ReservationCalendar /> },
        { path: 'currentReservations', element: <CurrentReservations /> },
        { path: 'pastReservations', element: <PastReservations /> },
        { path: 'deviceBrowser', element: <DeviceBrowser /> },
        { path: 'settings', element: <Settings /> },
        { path: 'createReservation', element: <CreateReservation /> },
        { path: 'addDevice', element: <AddDevice /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'login/:message', element: <Login /> },
        { path: 'register', element: <Register /> },
        // { path: 'pharmacyRegister', element: <RegisterPharmacy /> },
        // { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
