import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './shared/navbar/Navbar'
import Sidebar from './shared/sidebar/Sidebar'
import ContentBody from './shared/contentBody/ContentBody';

export default function App() {

  const [menuName, setMenuName] = React.useState('');

  const settingNavbarTitle = (title) => {
    setMenuName(title);
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar menuName={menuName} />
      <Sidebar onTitleChange={settingNavbarTitle} />
      <ContentBody />
    </Box>
  );
}
