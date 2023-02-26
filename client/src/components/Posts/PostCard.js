import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardActions, CardContent, CardMedia, CardTitle, Typography, Button, ButtonBase } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

// Card view of post for preview
// TODO: Make card a button to direct to ./Post/Post.js 
const PostCard = ({ post }) => {
    const navigate = useNavigate();
    //console.log("PostCard: " + post.image);

    const openPost = (e) => {
        navigate(`/post/${post._id}`);
    }

    return (
        <Card raised sx={{ height: 1 }} elevation={4}>
            <ButtonBase component='span' onClick={openPost}>
                <div>
                    <CardMedia component='img' src={`${post.image}`} title={post.title} />
                    <Typography variant='h6'>{post.title}</Typography>
                </div>
            </ButtonBase>
        </Card>
    );
}

export default PostCard;

// ! Need to credit for missing image file
// No Image by Kevin from <a href="https://thenounproject.com/browse/icons/term/no-image/" target="_blank" title="No Image Icons">Noun Project</a>