// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
//   {
//     title: 'dashboard',
//     path: '/dashboard',
//     icon: getIcon('eva:pie-chart-2-fill'),
//   },
  {
    title: 'Current Reservations',
    path: '/currentReservations',
    icon: getIcon('eva:list-fill'),
  },
  {
    title: 'Past Reservations',
    path: '/pastReservations',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Inventory',
    path: '/deviceBrowser',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'settings',
    path: '/settings',
    icon: getIcon('eva:settings-fill'),
  },
//   {
//     title: 'blog',
//     path: '/blog',
//     icon: getIcon('eva:file-text-fill'),
//   },
//   {
//     title: 'login',
//     path: '/login',
//     icon: getIcon('eva:lock-fill'),
//   },
//   {
//     title: 'register',
//     path: '/register',
//     icon: getIcon('eva:person-add-fill'),
//   },
//   {
//     title: 'Not found',
//     path: '/404',
//     icon: getIcon('eva:alert-triangle-fill'),
//   },
];

export default navConfig;
