import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid, Box } from '@mui/material';

import PostCard from '../Posts/PostCard';

const Posts = () => {
    // Get posts from redux state after dispatch in Home component
    const { posts, isLoading } = useSelector((state) => state.forumReducer);

    posts.map((post) => console.log(post)); // Instrumentation

    if (!posts.length && !isLoading) {
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
            <Grid container spacing={2} alignItems='stretch'>
                {posts.map((post) => (
                    <Grid key={post._id} item >
                        <PostCard post={post} />
                    </Grid>
                ))}
            </Grid>
        )

    )
}

export default Posts;