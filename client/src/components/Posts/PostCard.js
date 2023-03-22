import React from 'react';
import { Card, CardMedia, Typography, ButtonBase, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Card view of post for preview
const PostCard = ({ post }) => {
    const navigate = useNavigate();

    // redirect when clicking on postcard
    const openPost = (e) => {
        navigate(`/post/${post._id}`);
    }

    return (
        <Card raised sx={{ height: 1 }} elevation={4}>
            <ButtonBase component='span' onClick={openPost}>
                <div>
                    <CardMedia component='img' src={`${post.image}`} title={post.title} />
                </div>
            </ButtonBase>
            <Grid container>
                <Grid item>
                    <Typography variant='h4'>{post.title}</Typography>
                </Grid>
                <Grid item style={{ flexGrow: 1 }}></Grid>
            </Grid>
        </Card>
    );
}

export default PostCard;

// ! Need to credit for missing image file
// No Image by Kevin from <a href="https://thenounproject.com/browse/icons/term/no-image/" target="_blank" title="No Image Icons">Noun Project</a>