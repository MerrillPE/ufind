import React, { useEffect, useState } from "react";
import { Paper, Typography, CardMedia, Card } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getPost } from '../../../actions/forum';

// Individual post page
const Post = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    const post = useSelector((state) => state.forumReducer);

    //console.log(state);


    if (!post) {
        return null;
    }


    return (

        <Paper elevation={4} style={{ padding: '20px', borderRadius: '15px' }}>

            <Typography variant="h3">{post.title}</Typography>
            <CardMedia component='img' src={`${post.image}`} title={post.title} />
            <Typography>Posted by: {post.username}</Typography>
            <Typography>{moment(post.createdAt).fromNow()}</Typography>
            <Typography>{post.description}</Typography>
            <Typography>ZIP code: {post.location}</Typography>

        </Paper>


    )

}

export default Post;