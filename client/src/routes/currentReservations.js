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
import { Input, Toolbar } from "@mui/material";
import axios from "axios";
import { useTableSearch } from "../shared/useTableSearch";
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
import "./currentReservations.css";
import { red } from "@mui/material/colors";
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const URL = "http://localhost:5000/reservations";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const { list } = [
  {
    id: "1",
    name: "VSCode",
    deadline: new Date(2020, 1, 17),
    type: "SETUP",
    isComplete: true,
  },
  {
    id: "2",
    name: "JavaScript",
    deadline: new Date(2020, 2, 28),
    type: "LEARN",
    isComplete: true,
  },
  {
    id: "3",
    name: "React",
    deadline: new Date(2020, 3, 8),
    type: "LEARN",
    isComplete: false,
  },
];

// const { Search } = Input;

const fetchUsers = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users/"
  );
  console.log("data => ", data);
  return { data };
};

export default class CurrentReservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentReservations: [],
    };
  }
  // const data = { nodes: list };

  // const [books, setBooks] = useState();
  // const [search, setSearch] = useState("");
  // const [posts, setPosts ] = useState([]);

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

  // useEffect(() => {
  //   fetchHandler().then((res) => {
  //     // console.log("res => ",res)
  //     setBooks(res)

  //     // console.log("books => ",books)

  //   }).then(() => console.log("books1 => ",books))
  // }, []);

  // const retrievePosts = async () => {
  //   await axios.get("http://localhost:5000/reservations").then((res) => {
  //     // console.log("res => ",res)
  //     setPosts(res.data);
  //     // if(res.data){

  //     // }
  //     // console.log("posts => ",posts);
  //   })
  //   // .then((res))
  // }

  // useEffect(() => {
  //   retrievePosts().then(()=>console.log("posts => ",posts));

  // },[])

  // console.log(list);

  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  // };

  // // const data = {
  // //   nodes: list.filter((item) =>
  // //     item.name.toLowerCase().includes(search.toLowerCase())
  // //   ),
  // // };

  // const [searchVal, setSearchVal] = React.useState(null);

  // const { filteredData, loading } = useTableSearch({
  //   searchVal,
  //   retrieve: list,
  // });

  filterData(posts, searchKey) {
    const results = posts.filter((post) => 
      post.itemName.toLowerCase().includes(searchKey.toLowerCase())
    );
    this.setState({currentReservations: results});
  }

  handleSearch = async (e) =>  {
    const searchKey = e.target.value;

    await axios.get(URL).then(res => {
        this.filterData(res.data.reservations, searchKey)
    })
  };

  render() {
    return (
      <div>
        <Input
            id="standard-basic"
            className="mt-2 mb-4"
            label="Search"
            onChange={this.handleSearch}
            placeholder="Search..."
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />

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
                <td>N/A</td>
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
                          <Edit color="primary"/>
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="col colNeg">
                      <Tooltip title="Done">
                        <IconButton>
                          <CheckCircle color="success"/>
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="col colNeg">
                      <Tooltip title="Cancel">
                        <IconButton>
                          <DoDisturb sx={{color: "red"}} />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="col colNegCorner">
                      <Tooltip title="Delete">
                        <IconButton>
                          <DeleteIcon sx={{color: "black"}}/>
                        </IconButton>
                      </Tooltip>
                    </div>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // return (
  //   <Table data={data}>
  //     {(tableList) => (
  //       <>
  //         <TextField
  //           id="standard-basic"
  //           label="Search"
  //           variant="standard"
  //           onChange={handleSearch}
  //         />
  //         <Toolbar />
  //         <Header>
  //           <HeaderRow>
  //             <HeaderCell>Task</HeaderCell>
  //             <HeaderCell>Deadline</HeaderCell>
  //             <HeaderCell>Type</HeaderCell>
  //             <HeaderCell>Complete</HeaderCell>
  //           </HeaderRow>
  //         </Header>

  //         <Body>
  //           {tableList.map((item) => (
  //             <Row key={item.id} item={item}>
  //               <Cell>{item.name}</Cell>
  //               <Cell>
  //                 {item.deadline.toLocaleDateString("en-US", {
  //                   year: "numeric",
  //                   month: "2-digit",
  //                   day: "2-digit",
  //                 })}
  //               </Cell>
  //               <Cell>{item.type}</Cell>
  //               <Cell>{item.isComplete.toString()}</Cell>
  //             </Row>
  //           ))}
  //         </Body>
  //       </>
  //     )}
  //   </Table>
  // );
}
