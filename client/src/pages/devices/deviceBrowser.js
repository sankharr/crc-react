import React, { useState, useEffect, Component } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import CheckCircle from "@mui/icons-material/CheckCircle";
import DoDisturb from "@mui/icons-material/DoDisturb";
import Info from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

import { Button, Input, Toolbar } from "@mui/material";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import "./devices.css";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import AddDevice from "./addDevice";
import Add from "@mui/icons-material/Add";
import { withRouter } from "../withRouter";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const URL = "http://localhost:8080/product";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};


class DeviceBrowser extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      allDevices: [],
    };
  }


  componentDidMount() {
    fetchHandler()
      .then((res) => {
        this.setState({ allDevices: res.products });
      })
      .then(() =>
        console.log("allDevices => ", this.state.allDevices)
      );
  }


  filterData(devices, searchKey) {
    const results = devices.filter((device) =>
      device.itemName.toLowerCase().includes(searchKey.toLowerCase())
    );
    this.setState({ allDevices: results });
  }

  handleSearch = async (e) => {
    const searchKey = e.target.value;

    await axios.get(URL).then((res) => {
      this.filterData(res.data.devices, searchKey);
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
            onClick={() => this.props.navigate('/addDevice')}
          >
            Add Device
          </Button>
        </Toolbar>

        <table
          className="table align-middle table-hover table-striped"
          style={{}}
        >
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Total Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.allDevices.map((device) => (
              <tr key={device._id}>
                <td>{device.itemName}</td>
                <td>{device.totalQuantity}</td>
                <td>{device.price}</td>
                <td>
                  <div className="row">
                    {/* <div className="col colNeg">
                      <Tooltip title="More Info">
                        <IconButton>
                          <Info />
                        </IconButton>
                      </Tooltip>
                    </div> */}
                    <div className="col colNeg">
                      <Tooltip title="Edit">
                        <IconButton>
                          <Edit color="primary" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    {/* <div className="col colNeg">
                      <Tooltip title="Done">
                        <IconButton>
                          <CheckCircle color="success" />
                        </IconButton>
                      </Tooltip>
                    </div> */}
                    {/* <div className="col colNeg">
                      <Tooltip title="Cancel">
                        <IconButton>
                          <DoDisturb sx={{ color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    </div> */}
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

export default withRouter(DeviceBrowser);
