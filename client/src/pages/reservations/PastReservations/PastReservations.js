import React, { useState, useEffect, Component } from "react";
import { filter } from "lodash";

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Input,
  Toolbar,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Edit from "@mui/icons-material/Edit";
import CheckCircle from "@mui/icons-material/CheckCircle";
import DoDisturb from "@mui/icons-material/DoDisturb";
import Info from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

import TextField from "@mui/material/TextField";
import axios from "axios";
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
import { styled } from "@mui/material/styles";
import "../reservations.css";
import { red } from "@mui/material/colors";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import CreateReservation from "../CreateReservation";
import Add from "@mui/icons-material/Add";
import PastReservationsMoreMenu from "./PastReservationsMoreMenu";
import PastReservationsListHead from "./PastReservationsListHead";
import PastReservationsListToolbar from "./PastReservationsListToolbar";
import Scrollbar from "../../../components/Scrollbar";
import SearchNotFound from "../../../components/SearchNotFound";
import { connect } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { withRouter } from "../../withRouter";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  { id: "medicineName", label: "Medicine Name", align: "left" },
  { id: "quantity", label: "Quantity", align: "center" },
  {
    id: "startDate",
    label: "Start Date",
    align: "center",
  },
  {
    id: "endDate",
    label: "End Date",
    align: "center",
  },
  {
    id: "days",
    label: "Days",
    align: "center",
  },
  {
    id: "amount",
    label: "Amount",
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
  { id: "" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (request) =>
        request.itemName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PastReservations() {
  const URL = "http://localhost:9090/reservation";
  const [requestData, setRequestData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((res) => {
      console.log(res.reservations);
      setRequestData(res.reservations);
      console.log("data => ", requestData);
    });
  }, []);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("medicineName");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = requestData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requestData.length) : 0;

  const filteredUsers = applySortFilter(
    requestData,
    getComparator(order, orderBy),
    filterName
  );

  const finishReservation = async (id) => {
    await axios
      .put("http://localhost:9090/reservation/complete/" + id)
      .then((res) => {
        console.log("Reservation updated successfully", res);
        fetchHandler().then((res) => {
          console.log(res.reservations);
          setRequestData(res.reservations);
          console.log("data => ", requestData);
        });
      });
  };

  const cancelReservation = async (id) => {
    await axios
      .put("http://localhost:9090/reservation/cancel/" + id)
      .then((res) => {
        console.log("Reservation cancelled successfully", res);
        fetchHandler().then((res) => {
          console.log(res.reservations);
          setRequestData(res.reservations);
          console.log("data => ", requestData);
        });
      });
  };

  const deleteReservation = async (id) => {
    await axios
      .delete("http://localhost:9090/reservation/delete/" + id)
      .then((res) => {
        console.log("Reservation deleted successfully", res);
        fetchHandler().then((res) => {
          console.log(res.reservations);
          setRequestData(res.reservations);
          console.log("data => ", requestData);
        });
      });
  };

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <div>
      <Toolbar className="mt-2 mb-4">
        <div className="col" sx={{ flexGrow: 1 }}>
          <Typography variant="h4" noWrap>
            Past Reservations
          </Typography>
        </div>
      </Toolbar>
      <Card>
        <PastReservationsListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        {/* <Scrollbar> */}
        <TableContainer sx={{ minWidth: 800, paddingX: 3 }}>
          <Table>
            <PastReservationsListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={requestData.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    itemName,
                    quantity,
                    startDate,
                    endDate,
                    days,
                    amount,
                    customerName,
                    availablePharmacies,
                    avatarUrl,
                    isVerified,
                  } = row;
                  const isItemSelected = selected.indexOf(itemName) !== -1;
                  // console.log(itemName, " ====== ", requestorData);
                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell component="th" scope="row" padding="normal">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {itemName}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">{quantity}</TableCell>
                      <TableCell align="center">{startDate}</TableCell>
                      <TableCell align="center">{endDate}</TableCell>
                      <TableCell align="center">{days}</TableCell>
                      <TableCell align="center">{amount}</TableCell>
                      <TableCell align="center" padding="none">
                        <IconButton
                          aria-label="completed"
                          color="success"
                          onClick={() => finishReservation(_id)}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          aria-label="cancel"
                          color="error"
                          onClick={() => cancelReservation(_id)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell align="right">
                        <PastReservationsMoreMenu
                          deleteFunction={() => deleteReservation(_id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {/* </Scrollbar> */}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={requestData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <div className="row">
        <div className="col"></div>
      </div>
    </div>
  );
}
