import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Logout from '@mui/icons-material/Logout'
import { useSelector } from "react-redux";
import { getMenuTitle } from "../sidebar/sidebarSlice";

const drawerWidth = 240;

export default function Navbar(props) {

  const menuTitle = useSelector(getMenuTitle);

  return (
    <AppBar
      elevation={6}
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {/* {props.menuName} */}
          {menuTitle}
        </Typography>
        <Button color="inherit"><Logout /></Button>
      </Toolbar>
    </AppBar>
  );
}
