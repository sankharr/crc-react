import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './shared/navbar/Navbar'
import Sidebar from './shared/sidebar/Sidebar'
import ContentBody from './shared/contentBody/ContentBody';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function App() {

  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  const [menuName, setMenuName] = React.useState('');

  const gettingDataFromSidebar = (menuItemObject) => {
    setMenuName(menuItemObject.title);
    navigate(menuItemObject.path)
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar menuName={menuName} />
      <Sidebar onMenuItemChange={gettingDataFromSidebar} />
      <ContentBody />
    </Box>
  );
}
