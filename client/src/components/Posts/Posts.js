import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid, } from '@mui/material';

import PostCard from './PostCard';

const Posts = () => {
    // Get posts from redux state after dispatch in Home component
    const { posts, isLoading } = useSelector((state) => state.forumReducer);

    posts.map((post) => console.log(post)); // Instrumentation

    if (!posts.length && !isLoading) {
        return ('No Posts Exist');
    }

    return (

        // Creates grid of PostCards to preview each post 
        isLoading ? <CircularProgress /> : (
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