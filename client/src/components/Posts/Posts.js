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
        <Box style={{
            position: 'relative',
            minHeight: '80vh', // Set minimum height to 100vh to cover the entire viewport
        }}>
            {isLoading ? (
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', // Center CircularProgress vertically
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Grid
                    container
                    direction="row"
                    alignItems="stretch"
                    spacing={3}
                    style={{
                        padding: '16px', // Add padding to the Grid container
                    }}
                >
                    {posts.map((post) => (
                        <Grid
                            key={post._id}
                            item
                            xs={12} // Set xs to 12 to occupy the full width on small screens
                            sm={6} // Set sm to 6 to occupy half width on medium screens
                            md={4} // Set md to 4 to occupy one-third width on large screens
                        >
                            <PostCard post={post} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default Posts;