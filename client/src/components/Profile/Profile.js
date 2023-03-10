import React, { useState, useEffect, } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Button, Toolbar, Typography, Box, Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode';

// TODO: make profile avatar a link to profile page
const Profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  let avatarLetter;

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

      if (decoded.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  return (
    <Box sx={{ flexGrow: 1 }}>
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
          </Typography>

          {user && (
            <Button position="static" sx={{ mr: 1 }} variant='contained' component={Link} to="/MyPosts" > MyPosts</Button>
          )}
          
          {user && (
            <Button position="static" sx={{ mr: 1 }} variant='contained' component={Link} to="/Favorites" > Favorites </Button>
          )}
    </Box>
  );
};

export default Profile;