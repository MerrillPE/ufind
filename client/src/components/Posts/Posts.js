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
            
            <Grid container direction="row" alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={4} >
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3px"}}>
                            <PostCard post={post} />
                        </div>
                    </Grid>
                ))}
            </Grid>
            
        )

    )
}

export default Posts;