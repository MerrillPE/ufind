import React from 'react';
import { AppBar,Button,Toolbar,Typography,Box, makeStyles, Avatar} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

const Navbar = () => {

  const user = null;
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: 'lightblue'}}>
        <Toolbar>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography 
            variant="h6"
            noWrap
            component="a"
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
          <Button variant='contained' > Singin </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;