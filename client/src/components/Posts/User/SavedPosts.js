import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid, Box, Container, Typography } from '@mui/material';

import PostCard from '../PostCard';
import { getSavedPosts } from '../../../actions/forum';

const SavedPosts = () => {
    //const [savedPosts, setSavedPosts] = useState([]);
    const { savedPosts, isLoading } = useSelector((state) => state.forumReducer);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [userID, setUserID] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.username) {
            setUserID(user?._id);
        } else {
            setUserID(user?.sub);
        }
        if (userID) {
            dispatch(getSavedPosts(userID));
        }
    }, [user, userID, dispatch]);

    // Debug
    useEffect(() => {
        console.log("Saved posts: " + savedPosts);
    }, [savedPosts]);


    if (!savedPosts.length && !isLoading) {
        return ('No Posts Exist');
    }

    return (

        
        // Creates grid of PostCards to preview each post 
        <Box style={{
            position: 'relative',
            minHeight: '100vh', // Set minimum height to 100vh to cover the entire viewport
        }}>
        {isLoading ? (
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
                <Typography variant="h4" component="h2" fontWeight="bold" fontFamily={'monospace'} textAlign={'center'}  marginBottom={3}>
                    Saved Posts
                </Typography>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item >
                        <Grid container spacing={3} alignItems='stretch'>
                            {savedPosts.map((post) => (
                                <Grid key={post._id} item xs={12} sm={6} md={4}>
                                    <PostCard post={post} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container >
        )}
        </Box>
    )
}

export default SavedPosts;