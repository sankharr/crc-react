import React, { useState, useEffect, Component } from "react";

// import { Table, Input } from "antd";
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import CheckCircle from "@mui/icons-material/CheckCircle";
import DoDisturb from "@mui/icons-material/DoDisturb";
import Info from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

import TextField from "@mui/material/TextField";
import { Button, Input, Toolbar } from "@mui/material";
import axios from "axios";
// import { useTableSearch } from "../shared/useTableSearch";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import "./reservations.css";
import { red } from "@mui/material/colors";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import CreateReservation from "./createReservation";
import Add from "@mui/icons-material/Add";
import { connect } from "react-redux";
// import { updateNavigatePath } from '../shared/sidebar/sidebarSlice'

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { withRouter } from "../withRouter";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const URL = "http://localhost:9090/reservation";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};


class CurrentReservations extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      currentReservations: [],
      createReservationModalOpen: false,
    };
  }


  componentDidMount() {
    fetchHandler()
      .then((res) => {
        // console.log("res => ",res)
        this.setState({ currentReservations: res.reservations });

        // console.log("books => ",books)
      })
      .then(() =>
        console.log("currentReservations => ", this.state.currentReservations)
      );
  }

  handleCRModalClick = () => {
    this.setState({
      createReservationModalOpen: !this.state.createReservationModalOpen,
    });
  };

  filterData(posts, searchKey) {
    const results = posts.filter((post) =>
      post.itemName.toLowerCase().includes(searchKey.toLowerCase())
    );
    this.setState({ currentReservations: results });
  }

  handleSearch = async (e) => {
    const searchKey = e.target.value;

    await axios.get(URL).then((res) => {
      this.filterData(res.data.reservations, searchKey);
    });
  };

  render() {
    return (
      <div>
        <Toolbar className="mt-2 mb-4">
          <div className="col" sx={{ flexGrow: 1 }}>
            <Input
              id="standard-basic"
              label="Search"
              onChange={this.handleSearch}
              placeholder="Search..."
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </div>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => this.props.navigate('/createReservation')}
          >
            New Reservation
          </Button>
          {/* <CreateReservation
            openVariable={this.state.createReservationModalOpen}
            onCloseFunction={this.handleCRModalClick}
          /> */}
        </Toolbar>

        <table
          className="table align-middle table-hover table-striped"
          style={{}}
        >
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Reservation Start Date</th>
              <th scope="col">Reservation End Date</th>
              <th scope="col">Quantity</th>
              <th scope="col">Number of Days</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.currentReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.itemName}</td>
                <td>{reservation.startDate}</td>
                <td>{reservation.endDate}</td>
                <td>{reservation.quantity}</td>
                <td>{reservation.days}</td>
                <td>{reservation.amount}</td>
                <td>
                  <div className="row">
                    <div className="col colNeg">
                      <Tooltip title="More Info">
                        <IconButton>
                          <Info />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="col colNeg">
                      <Tooltip title="Edit">
                        <IconButton>
                          <Edit color="primary" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="col colNeg">
                      <Tooltip title="Done">
                        <IconButton>
                          <CheckCircle color="success" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="col colNeg">
                      <Tooltip title="Cancel">
                        <IconButton>
                          <DoDisturb sx={{ color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="col colNegCorner">
                      <Tooltip title="Delete">
                        <IconButton>
                          <DeleteIcon sx={{ color: "black" }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state){
//   return {
//     pathState: state.sidebar.navigatePath
//   }
// }

export default withRouter(CurrentReservations);
// export default CurrentReservations;
