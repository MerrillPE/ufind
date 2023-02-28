import React from 'react';
import { AppBar,Button,Toolbar,Typography,Box,IconButton } from '@mui/material';


const Navbar = () => {
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UFind
          </Typography>
          <Button color="inherit"> SignIn </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;