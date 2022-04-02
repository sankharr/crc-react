import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link, Outlet } from "react-router-dom";

// const drawerWidth = 240;

export default function ContentBody() {

  const [menuName, setMenuName] = React.useState('');

  const settingNavbarTitle = (title) => {
    setMenuName(title);
  }

  

  return (
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {/* <Link variant='button' to="/testPage" underline='none'><Button variant='contained'>Click Me</Button></Link> */}
        
        <Outlet />
      </Box>
  );
}
