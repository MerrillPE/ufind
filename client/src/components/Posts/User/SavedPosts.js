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
        isLoading ? (
            <Box style={{
                display: 'flex', flexDirection: 'column',
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <CircularProgress />
            </Box>
        ) : (
            <Container maxWidth='xl' sx={{ mt: 3 }}>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Grid container spacing={2} alignItems='stretch'>
                            {savedPosts.map((post) => (
                                <Grid key={post._id} item >
                                    <PostCard post={post} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container >
        )

    )
}

export default SavedPosts;