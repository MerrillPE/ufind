import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardMedia, Typography, IconButton, ButtonBase, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

import { deletePost } from '../../actions/forum';

// Card view of post for preview
const PostCard = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //console.log("PostCard: " + post.image);

    const openPost = (e) => {
        navigate(`/post/${post._id}`);
    }

    //! This function and the button is just for testing, should probably move delete functionality to the post page
    // has to have different name than action to avoid range error recursive call
    const removePost = (e) => {
        //console.log(post._id);
        dispatch(deletePost(post._id));
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
                <Grid item>
                    <IconButton onClick={removePost}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Card>
    );
}

export default PostCard;

// ! Need to credit for missing image file
// No Image by Kevin from <a href="https://thenounproject.com/browse/icons/term/no-image/" target="_blank" title="No Image Icons">Noun Project</a>