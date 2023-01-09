import './home.css';
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
  EmojiEmotions, Home, Image, Share, Mail, Notifications,
  PersonAdd, YouTube, Favorite, MoreVert,
  StarBorder, ExpandLess, LiveTv, SportsEsports, VideoCameraBack, PlayCircle, Inbox,
  FavoriteBorder, ModeNight, PeopleAlt, Logout
} from '@mui/icons-material'
import moment from 'moment'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system'
import HomeIcon from '@mui/icons-material/Home';
import {
  AppBar, Avatar, AvatarGroup, Badge, Button, ButtonGroup, Card, CardActions, CardContent,
  CardHeader, CardMedia, Checkbox, Collapse, Divider, FormControl, Icon, IconButton, ImageList,
  ImageListItem, Input, InputBase, InputLabel, List, ListItem, ListItemAvatar, ListItemButton,
  ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Select, Stack, styled, Switch, TextField,
  Toolbar, Typography
} from '@mui/material'
import { GlobalContext } from '../context/context';
import coverImage from './../assets/cover.png'
import profilePhoto from './../assets/profile.jpg';



function Profile() {
  let { state, dispatch } = useContext(GlobalContext);

  const [tweets, setTweets] = useState([]);
  const [tweetsText, setTweetsText] = useState([]);
  
  const [deleter, setDeleter] = useState("");
 
  const [toggleReload, setToggleReload] = useState(false);
  const [editingTweet, setEditingTweet] = useState({
    editingId: null,
    editingText: "",
  });
  const [open, setOpen] = useState(false);
  // Get All Products

  const logoutHandler = async () => {

    try {
      let response = await axios.post(`${state.baseUrl}/api/v1/logout`, {
        withCredentials: true
      })
      console.log("response: ", response);
      toast('Logout Succuesful ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({
        type: 'USER_LOGOUT'
      })
    } catch (error) {
      console.log("axios error: ", error);
      toast.error('Logout Error', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }

  }


  const getAllTweets  = () => {
    axios.get(`${state.baseUrl}/api/v1/tweets`)
      .then(response => {
        console.log("All Tweets", response.data.data);
        setTweets(response.data.data.reverse())
      })
      .catch(err => {
        console.log("err", err);
      })
  };


  useEffect(() => {


    getAllTweets();


  }, [toggleReload])






  const saveTweet = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${state.baseUrl}/api/v1/tweet`,

       {
        text: tweetsText
      
      });
      setToggleReload(!toggleReload)
      
      toast.success('Added Sucessfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log("err", err);
      toast.error('Failed', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };


  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${state.baseUrl}/api/v1/tweet/${editingTweet.editingId}`,
         {


        });
     
      setToggleReload(!toggleReload);

      setEditingTweet({
        editingId: null,
        editingText: "",
       
      });
      toast.success('Update Sucessfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log("err", err);
      toast.error('Update Error', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deleted = () => {
    // console.log(postId);
    setToggleReload(!toggleReload);
    axios.delete(`${state.baseUrl}/api/v1/tweet/:${deleter}`)
      .then((response) => {
        console.log(response.data);
        toast.success('Deleted Sucessfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getAllTweets();
      })

      .catch((err) => {
        console.log("err", err);
        toast.error('Delete Error', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
  })


  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%"
  }))
  const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: { display: "flex" }
  }))
  const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: { display: "none" }
  }))
  const UserBox1 = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
  })

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography variant="h6" sx={{ display: { xs: "none ", sm: "block" } }} className="logo">
            E-Commerce
          </Typography>
          <HomeIcon sx={{ display: { xs: "block ", sm: "none" } }} className="logo" />
          <Search><InputBase placeholder='Search' sx={{ width: "100%" }} /></Search>
          <Icons>

            <Badge badgeContent={4} color="secondary" className="icon">
              <Mail />
            </Badge>
            <Badge badgeContent={4} color="secondary" className="icon">
              <Notifications />
            </Badge>
            <Avatar sx={{ width: 30, height: 30 }}
              src="https://avatars.githubusercontent.com/u/102538169?v=4"

              onClick={e => setOpen(true)}
              className="profile"
            />
          </Icons>
          <UserBox onClick={e => setOpen(true)}  >
            <Avatar sx={{ width: 30, height: 30 }}
              src="https://avatars.githubusercontent.com/u/102538169?v=4" />
            <Typography variant='span' className="profile">Awais</Typography>
          </UserBox>
        </StyledToolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={e => setOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        > <MenuItem>{state?.user?.email}</MenuItem>
          <MenuItem > <Link to={`/profile`}>Profile</Link></MenuItem>
          <MenuItem ><Link to={`/change-password`}>Change Password</Link></MenuItem>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      </AppBar>
      <div className='banner'>
                <img className='cover' src={coverImage} alt="" />
            </div>
            <div className='pic' >
                <img src={profilePhoto} alt="" />
                <span>{state?.user?.firstName} {state?.user?.lastName}  </span>
                
               </div>

      

       





     




        <ToastContainer />
     
    </>
  );
}

export default Profile;