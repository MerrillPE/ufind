import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, } from '@mui/material';

import PostCard from './PostCard';

const Posts = () => {
    // Get posts from redux state after dispatch in Home component
    const posts = useSelector((state) => state.forumReducer.posts);

    posts.map((post) => console.log(post)); // Instrumentation

    return (

        // Creates grid of PostCards to preview each post 
        <Grid container spacing={2} alignItems='stretch'>
            {posts.map((post) => (
                <Grid key={post._id} item >
                    <PostCard post={post} />
                </Grid>
            ))}
        </Grid>

    )
}

export default Posts;