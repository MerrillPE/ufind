import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, Grid, CircularProgress, Box } from "@mui/material";
//import {auth} from '../forum/middleware/auth.js';
import { getUserPosts } from '../../actions/forum';
import Posts from '../Posts/Posts';
import PostCard from '../Posts/PostCard';

const MyPosts = (req) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  //const user = JSON.parse(localStorage.getItem('profile'));
  const { userPosts, isLoading } = useSelector((state) => state.forumReducer);


  //console.log("JUser: " + user?.username);
  //const auth = require("../middleware/auth");

  //console.log("Before use effect")

  useEffect(() => {
    // dispatch get request at page load

    dispatch(getUserPosts(user?._id || user?.sub)); //this query should call the right api, req.UserID


    // Checking data flow
    //posts.data.map((post) => console.log(post))
  }, [dispatch, user]);

  if (!userPosts?.length && !isLoading) {
    return ('No Posts Exist');
  }

  return (
    /*
      <Grow in>
          <Container>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={7}>
                     
                  </Grid>
              </Grid>
          </Container>
      </Grow>


      //<Typography>TEST HOME</Typography>
      */
      <Box style={{
        position: 'relative',
        minHeight: '80vh', // Set minimum height to 100vh to cover the entire viewport
    }}>
        {
    isLoading ? (
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Center CircularProgress vertically
      }}>
        <CircularProgress />
      </Box>
    ) : (
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" fontFamily={'monospace'} textAlign={'center'} marginBottom={3}>
          My Posts
        </Typography>
        <Grid container
              direction="row"
              alignItems="stretch"
              spacing={3}
              style={{
              padding: '16px', // Add padding to the Grid container
                    }}>
          <Grid  >
            <Grid container spacing={3} alignItems='stretch'>
              {userPosts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={4} >
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container >
    )}
    </Box>
  );
}

export default MyPosts;