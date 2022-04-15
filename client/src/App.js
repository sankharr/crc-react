import React, {useState, useEffect} from 'react';
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
import { useSelector } from 'react-redux';
import axios from "axios";

const URL = "http://localhost:5000/reservations";

export default function App() {

  const navigatePath = useSelector((state) => state.sidebar.navigatePath);

  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  const [menuName, setMenuName] = React.useState('');
  const [posts, setPosts ] = useState([]);

  useEffect(() => {
    navigateToPage()

  }, [navigatePath])

  // const retrievePosts = async () => {
  //   await axios.get("http://localhost:5000/reservations").then((res) => {
  //     // console.log("res => ",res)
  //     setPosts(res.data);
  //     // if(res.data){
        
  //     // }
  //     console.log("posts => ",posts);
  //   })
  // }

  // useEffect(() => {
  //   retrievePosts()
  // },[])

  const navigateToPage = () => {
    navigate(navigatePath)
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar menuName={menuName} />
      <Sidebar />
      <ContentBody />
    </Box>
  );
}
