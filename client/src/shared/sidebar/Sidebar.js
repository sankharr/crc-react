import * as React from "react";
import { useDispatch } from 'react-redux'
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import History from "@mui/icons-material/History";
import Warehouse from "@mui/icons-material/Warehouse";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import SettingsIcon from '@mui/icons-material/Settings';

import Logo from "../../assets/logo.png";
import "./Sidebar.css";
import { updateHeaderTitle, updateNavigatePath } from './sidebarSlice'

// This will determine the width of the sidebar
const drawerWidth = 240;

const menuItems = [
  { title: "Reservation Calendar", icon: <CalendarMonth />, path: "/reservationCalendar"},
  { title: "Current Reservations", icon: <DnsRoundedIcon />, path: "/currentReservations"},
  { title: "Past Reservations", icon: <History />, path: "/pastReservations"},
  { title: "All Inventory", icon: <Warehouse />, path: "/deviceBrowser"},
  { title: "Settings", icon: <SettingsIcon />, path: "/settings"}
]

export default function Sidebar(props) {

  const dispatch = useDispatch();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <img src={Logo} alt="CameraRentClub" className="logoImage" />
      </Toolbar>
      <Toolbar className="adminText">
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          align="justify"
          className="adminText"
        ><b>Admin Console</b>
          
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((menuItem, index) => (
          <ListItem
            button
            key={menuItem.title}
            // onClick={() => {
            //   props.onMenuItemChange(menuItem);
            // }}
            onClick={()=> {
              dispatch(updateHeaderTitle(menuItem.title));
              dispatch(updateNavigatePath(menuItem.path));
            }}
          >
            <ListItemIcon>
              {menuItem.icon}
            </ListItemIcon>
            <ListItemText primary={menuItem.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
