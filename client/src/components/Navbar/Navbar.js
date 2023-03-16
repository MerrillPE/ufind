import React, { useState, useEffect, } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Button, Toolbar, Typography, Box, Avatar, } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useLocation, useNavigate } from 'react-router-dom';


import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode';



// TODO: make profile avatar a link to profile page
const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); // Get user data from browser's local storage

  // Initialize letter used for avatar
  let avatarLetter;

  // field name will be different depending on whether google login or auth login
  if (user?.username) {
    //console.log(user?.username.charAt(0));
    avatarLetter = user?.username.charAt(0);
  } else {
    avatarLetter = user?.name.charAt(0);
  }

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decoded = decode(token);

      // logout when token expires
      if (decoded.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'lightblue' }}>
        <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link} to="/"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            UFind
          </Typography>


          {user ? (
            <Button position="static" sx={{ mr: 1 }} variant='contained' component={Link} to="/createPost" > Create Post </Button>
          ) : (
            <Button position="static" sx={{ mr: 1 }} variant='contained' component={Link} to="/signin" > Login </Button>
          )}

          {user ? (
            <Button position="static" sx={{ mr: 1 }} variant='contained' onClick={logout} > Logout </Button>
          ) : (
            <Button position="static" variant='contained' component={Link} to="/signup" > Sign Up </Button>
          )}

          {user && (
            <Avatar sx={{ bgcolor: deepOrange[300] }}>{avatarLetter}</Avatar>
          )}


        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;