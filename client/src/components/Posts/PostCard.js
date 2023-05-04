import React from 'react';
import { Card, CardMedia, Typography, ButtonBase, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import backgroundImage from '../../images/background.png'

// Card view of post for preview
const PostCard = ({ post }) => {
    const navigate = useNavigate();

    // redirect when clicking on postcard
    const openPost = (e) => {
        navigate(`/post/${post._id}`);
    }

    const cardStyle = {
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        overflow: 'hidden',
    }

    //console.log("Time: " + post.createdAt);

    return (
        <Card
            raised sx={cardStyle}>
            <Grid container direction="column" justifyContent="space-between">
                <Grid item >
                    <ButtonBase component='span' onClick={openPost}>
                        <CardMedia
                            component='img'
                            src={`${post.image}`}
                            title={post.title}
                            style={{ aspectRatio: '11/9', objectFit: 'contain' }} />
                    </ButtonBase>
                </Grid>
                <Grid item >
                    <Typography variant="h5" sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.2rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        fontSize: `${30 - Math.min(post.title.length, 12)}px`,
                    }} >{post.title}
                    </Typography>
                    <Typography variant='body1'>{JSON.parse(post.location).formatted_address}</Typography>
                    <Typography variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export default PostCard;

// ! Need to credit for missing image file
// No Image by Kevin from <a href="https://thenounproject.com/browse/icons/term/no-image/" target="_blank" title="No Image Icons">Noun Project</a>