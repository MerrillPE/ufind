//now profile links to posts, 
//but later, instead of linking to posts, 
//link to this page, and only call posts i creates
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, } from '@mui/material';

import PostDisplay from './PostDisplay';

const Profiles = () => {
    // Get posts from redux state after dispatch in Home component
    const posts = useSelector((state) => state.forumReducer.posts);

    posts.map((post) => console.log(post)); // Instrumentation

    return (

        // Creates grid of PostCards to preview each post 
        <Grid container spacing={2} alignItems='stretch'>
            {posts.map((post) => (
                <Grid key={post._id} item >
                    <PostDisplay post={post} />
                </Grid>
            ))}
        </Grid>

    )
}

export default Profiles;