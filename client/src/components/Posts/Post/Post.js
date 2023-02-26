import React, { useEffect, useState } from "react";
import { Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getPost } from '../../../actions/forum';

const Post = () => {
    const { post, posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]) // ! may need to remove dispatch from dependencies if it starts infinite loads

    if (!post) {
        return null;
    }

    return (
        <Paper elevation={4} style={{ padding: '20px', borderRadius: '15px' }}>
            <Typography variant="h3">Test Post</Typography>
        </Paper>
    )

}

export default Post;