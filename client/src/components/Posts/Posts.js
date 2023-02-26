import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';

import PostCard from './PostCard';

const Posts = () => {
    const posts = useSelector((state) => state.forumReducer);

    posts.map((post) => console.log(post)); // Instrumentation

    return (

        <Grid container spacing={2} alignItems='stretch'>
            {posts.map((post) => (
                <Grid key={post._id} item >
                    <PostCard post={post} />
                </Grid>
            ))}
        </Grid>


        //<Typography>Test Posts</Typography>
    )
}

export default Posts;