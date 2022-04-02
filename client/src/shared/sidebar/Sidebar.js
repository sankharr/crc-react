import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Logo from "../../assets/logo.png";
import Typography from "@mui/material/Typography";
import "./Sidebar.css";

import CalendarMonth from "@mui/icons-material/CalendarMonth";
import History from "@mui/icons-material/History";
import Warehouse from "@mui/icons-material/Warehouse";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const menuItems = [
  { title: "Reservation Calendar", icon: <CalendarMonth />},
  { title: "Current Reservations", icon: <DnsRoundedIcon />},
  { title: "Past Reservations", icon: <History />},
  { title: "All Inventory", icon: <Warehouse />},
  { title: "Settings", icon: <SettingsIcon />}
]

export default function Sidebar(props) {
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
          // className="adminText"
        ><b>Admin Console</b>
          
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((menuItem, index) => (
          <ListItem
            button
            key={menuItem.title}
            onClick={() => {
              props.onTitleChange(menuItem.title);
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
